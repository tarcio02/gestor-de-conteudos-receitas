import { HttpError } from './HttpError'

type HttpMethod = 'GET' | 'POST'

type HttpOptions = {
  method?: HttpMethod
  body?: unknown
}

// Envelope que o Apps Script retorna
type ApiEnvelope<T> = {
  ok: boolean
  status: number
  data?: T
  error?: string
}

export async function http<T>(path: string, options: HttpOptions = {}): Promise<T> {
  // ✅ Em DEV vamos chamar o proxy do Vite (/api)
  // ✅ Em PROD você pode setar VITE_API_BASE_URL (ex: /api ou https://seu-backend.com/api)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const base = (import.meta as any).env?.VITE_API_BASE_URL ?? '/api'

  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`
  const method = options.method ?? 'GET'
  const hasBody = options.body !== undefined && method !== 'GET'
  const headers = hasBody ? { 'Content-Type': 'application/json' } : undefined

  const res = await fetch(url, {
    method,
    headers,
    body: hasBody ? JSON.stringify(options.body) : undefined,
  })

  const text = await res.text()
  const parsed = text ? safeJsonParse(text) : null

  // Se não é JSON, segue padrão antigo
  if (!parsed || typeof parsed !== 'object') {
    if (!res.ok) throw new HttpError(res.status, parsed)
    return parsed as T
  }

  // ✅ Se veio envelope do Apps Script, usamos o "ok/status" dele
  if ('ok' in parsed && 'status' in parsed) {
    const env = parsed as ApiEnvelope<T>

    if (!env.ok) {
      throw new HttpError(env.status || res.status || 500, env)
    }

    // env.data é o payload real do endpoint (/recipes retorna {data: Recipe[]})
    return (env.data as T) ?? ({} as T)
  }

  // ✅ Se veio JSON direto (sem envelope)
  if (!res.ok) throw new HttpError(res.status, parsed)
  return parsed as T
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
