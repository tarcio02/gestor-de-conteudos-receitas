import type { HeroSlide, HeroSlidesResponse } from '../model/hero.types'

const TSV_URL = import.meta.env.VITE_API_HEROS

type HeroSheetRow = {
  id?: string
  user_id?: string
  url?: string
  url_mobile?: string
  has_overlay?: string
  title?: string
  highlight?: string
  subtitle?: string
  has_button?: string
  button?: string
  link?: string
}

function parseTSV(tsv: string) {
  const rows = tsv
    .split('\n')
    .map((row) => row.replace(/\r$/, ''))
    .filter(Boolean)

  if (rows.length === 0) return []

  const headers = rows[0].split('\t').map((header) => header.trim())

  return rows.slice(1).map((row) => {
    const values = row.split('\t')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed: any = {}

    headers.forEach((header, index) => {
      parsed[header] = values[index] ?? ''
    })

    return parsed as HeroSheetRow
  })
}

function isTrue(value: unknown): boolean {
  return String(value).trim().toUpperCase() === 'TRUE'
}

function extractDriveFileId(url: string): string | null {
  const trimmedUrl = String(url).trim()
  if (!trimmedUrl) return null

  const byPath = trimmedUrl.match(/\/file\/d\/([^/]+)/i)
  if (byPath?.[1]) return byPath[1]

  const byQuery = trimmedUrl.match(/[?&]id=([^&]+)/i)
  if (byQuery?.[1]) return byQuery[1]

  return null
}

function normalizeDriveImageUrl(url: string): string {
  const fileId = extractDriveFileId(url)
  if (!fileId) return String(url ?? '').trim()

  return `https://lh3.googleusercontent.com/d/${fileId}=w1600`
}

function mapRowToHeroSlide(row: HeroSheetRow): HeroSlide {
  return {
    id: String(row.id ?? ''),
    userId: String(row.user_id ?? ''),
    imageUrl: normalizeDriveImageUrl(String(row.url ?? '')),
    imageMobileUrl: normalizeDriveImageUrl(String(row.url_mobile ?? '')),
    hasOverlay: isTrue(row.has_overlay),
    title: String(row.title ?? ''),
    highlight: String(row.highlight ?? ''),
    subtitle: String(row.subtitle ?? ''),
    hasButton: isTrue(row.has_button),
    buttonLabel: String(row.button ?? ''),
    buttonLink: String(row.link ?? ''),
  }
}

export const heroApi = {
  async listPublic(userId: string): Promise<HeroSlidesResponse> {
    if (!TSV_URL) throw new Error('VITE_API_HEROS nao configurado')
    const normalizedUserId = String(userId ?? '').trim()

    const response = await fetch(TSV_URL)
    if (!response.ok) {
      throw new Error('Falha ao carregar dados de hero')
    }

    const tsv = await response.text()
    const data = parseTSV(tsv)
      .filter((row) => String(row.user_id ?? '').trim() === normalizedUserId)
      .map(mapRowToHeroSlide)

    return { data }
  },
}
