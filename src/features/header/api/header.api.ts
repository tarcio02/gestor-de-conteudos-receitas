import type { HeaderConfig, HeaderConfigResponse } from '../model/header.types'

const TSV_URL = import.meta.env.VITE_API_HEADER_CONFIG

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HeaderConfigRow = Record<string, any>

function parseSheet(rawText: string): HeaderConfigRow[] {
  const rows = rawText
    .split('\n')
    .map((row) => row.replace(/\r$/, ''))
    .filter((row) => row.trim().length > 0)

  if (rows.length === 0) return []

  const delimiter = rows[0].includes('\t') ? '\t' : ','
  const headers = rows[0].split(delimiter).map((header) => header.trim())

  return rows.slice(1).map((row) => {
    const values = row.split(delimiter)
    const parsed: HeaderConfigRow = {}

    headers.forEach((header, index) => {
      parsed[header] = values[index] ?? ''
    })

    return parsed
  })
}

function normalizeKey(key: string): string {
  return String(key ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
}

function normalizeValue(value: unknown): string {
  const normalized = String(value ?? '')
    .trim()
    .replace(/^['"]+|['"]+$/g, '')

  const lower = normalized.toLowerCase()
  if (!normalized) return ''
  if (lower === 'nao tem link' || lower === 'não tem link' || lower === 'sem link') return ''

  return normalized
}

function buildNormalizedRow(row: HeaderConfigRow): Record<string, string> {
  const normalized: Record<string, string> = {}

  Object.entries(row).forEach(([key, value]) => {
    normalized[normalizeKey(key)] = normalizeValue(value)
  })

  return normalized
}

function readStringField(row: HeaderConfigRow, aliases: string[]): string {
  const normalizedRow = buildNormalizedRow(row)

  for (const alias of aliases) {
    const value = normalizedRow[normalizeKey(alias)]
    if (value) return value
  }

  return ''
}

function mapRowToConfig(row: HeaderConfigRow): HeaderConfig {
  return {
    whatsappPhone: readStringField(row, ['whatsapp', 'whatsapp_url', 'link_whatsapp']),
    instagramUrl: readStringField(row, ['instagram_url', 'instagram']),
    ecommerceLink: readStringField(row, [
      'ecommerce_link',
      'eccomerce_link',
      'e_commerce_link',
      'produtos',
      'products_link',
    ]),
    logoUrl: readStringField(row, ['logo_url', 'logo']),
  }
}

function hasAnyHeaderConfig(config: HeaderConfig): boolean {
  return Boolean(config.whatsappPhone || config.instagramUrl || config.ecommerceLink || config.logoUrl)
}

export const headerApi = {
  async getPublicConfig(userId: string): Promise<HeaderConfigResponse> {
    if (!TSV_URL) throw new Error('VITE_API_HEADER_CONFIG nao configurado')

    const normalizedUserId = String(userId ?? '').trim()

    const response = await fetch(TSV_URL)
    if (!response.ok) {
      throw new Error('Falha ao carregar configuracao do header')
    }

    const rawText = await response.text()
    const rows = parseSheet(rawText).filter((row) => {
      if (!normalizedUserId) return true
      return readStringField(row, ['user_id']) === normalizedUserId
    })

    if (rows.length === 0) return { data: null }

    const configs = rows.map(mapRowToConfig)
    const firstValid = configs.find(hasAnyHeaderConfig)

    return { data: firstValid ?? configs[0] ?? null }
  },
}
