import type { FooterConfig, FooterConfigResponse } from '../model/footer.types'

const TSV_URL = import.meta.env.VITE_API_FOOTER_CONFIG

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FooterConfigRow = Record<string, any>

function parseSheet(rawText: string): FooterConfigRow[] {
  const rows = rawText
    .split('\n')
    .map((row) => row.replace(/\r$/, ''))
    .filter((row) => row.trim().length > 0)

  if (rows.length === 0) return []

  const delimiter = rows[0].includes('\t') ? '\t' : ','
  const headers = rows[0].split(delimiter).map((header) => header.trim())

  return rows.slice(1).map((row) => {
    const values = row.split(delimiter)
    const parsed: FooterConfigRow = {}

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
  return String(value ?? '')
    .trim()
    .replace(/^['"]+|['"]+$/g, '')
}

function buildNormalizedRow(row: FooterConfigRow): Record<string, string> {
  const normalized: Record<string, string> = {}

  Object.entries(row).forEach(([key, value]) => {
    normalized[normalizeKey(key)] = normalizeValue(value)
  })

  return normalized
}

function readField(row: FooterConfigRow, aliases: string[]): string {
  const normalizedRow = buildNormalizedRow(row)

  for (const alias of aliases) {
    const value = normalizedRow[normalizeKey(alias)]
    if (value) return value
  }

  return ''
}

function mapRowToConfig(row: FooterConfigRow): FooterConfig {
  return {
    companyName: readField(row, ['company_name', 'company', 'nome_empresa']),
  }
}

export const footerApi = {
  async getPublicConfig(userId: string): Promise<FooterConfigResponse> {
    if (!TSV_URL) throw new Error('VITE_API_FOOTER_CONFIG nao configurado')

    const normalizedUserId = String(userId ?? '').trim()

    const response = await fetch(TSV_URL)
    if (!response.ok) {
      throw new Error('Falha ao carregar configuracao do footer')
    }

    const rawText = await response.text()
    const rows = parseSheet(rawText).filter((row) => {
      if (!normalizedUserId) return true
      return readField(row, ['user_id']) === normalizedUserId
    })

    const first = rows[0]
    if (!first) return { data: null }

    return { data: mapRowToConfig(first) }
  },
}
