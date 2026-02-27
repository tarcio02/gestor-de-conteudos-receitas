import type {
  AuthUser,
  LoginInput,
  LoginResponse,
  LoginSuccessResponse,
  SignupInput,
  SignupResponse,
  SignupSuccessResponse,
  UserGetResponse,
} from '../model/auth.types'

const APPSCRIPT_API = import.meta.env.VITE_ENDPOINT_APPSSCRIPT
const TOKEN_KEY = 'token'

function ensureApiConfigured() {
  if (!APPSCRIPT_API) throw new Error('VITE_ENDPOINT_APPSSCRIPT nao configurado')
}

export async function authLogin(email: string, password: string): Promise<LoginSuccessResponse> {
  ensureApiConfigured()

  const r = await fetch(APPSCRIPT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'login', email, password }),
  })

  const data = (await r.json()) as LoginResponse
  if (!data.ok) throw new Error(data.error)

  localStorage.setItem(TOKEN_KEY, data.token)
  return data
}

export async function authSignup(email: string, password: string): Promise<SignupSuccessResponse> {
  ensureApiConfigured()

  const r = await fetch(APPSCRIPT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'signup', email, password }),
  })

  const data = (await r.json()) as SignupResponse
  if (!data.ok) throw new Error(data.error)

  return data
}

export async function authGetUser(): Promise<AuthUser | null> {
  ensureApiConfigured()

  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  const r = await fetch(APPSCRIPT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'userGet', token }),
  })

  const data = (await r.json()) as UserGetResponse
  if (!data.ok) {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }

  return data.user
}

export function authLogout() {
  localStorage.removeItem(TOKEN_KEY)
}

export const authApi = {
  login(input: LoginInput) {
    return authLogin(input.email, input.password)
  },
  signup(input: SignupInput) {
    return authSignup(input.email, input.password)
  },
  getUser() {
    return authGetUser()
  },
  logout() {
    authLogout()
  },
}
