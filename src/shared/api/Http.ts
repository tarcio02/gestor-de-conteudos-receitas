import { env } from '../../app/config/env'
import { HttpError } from './HttpError'

type HttpMethod = 'GET' | 'POST'

type HttpOptions = {
  method?: HttpMethod
  body?: unknown
}

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const base = env.API_BASE_URL.replace(/\/$/, '')
  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`

  const res = await fetch(url, {
    method: options.method ?? 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const text = await res.text()
  const data = text ? safeJsonParse(text) : null

  if (!res.ok) throw new HttpError(res.status, data)
  return data as T
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
