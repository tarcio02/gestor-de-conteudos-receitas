export type LoginInput = { email: string; password: string }
export type SignupInput = { email: string; password: string }

export type AuthUser = {
  id: string
  email: string
  role: string
  active: boolean
  created_at: string
}

export type LoginSuccessResponse = {
  ok: true
  token: string
  user?: AuthUser
  user_id?: string
}

export type LoginErrorResponse = {
  ok: false
  error: string
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse

export type SignupSuccessResponse = {
  ok: true
  message?: string
  token?: string
  user?: AuthUser
}

export type SignupErrorResponse = {
  ok: false
  error: string
}

export type SignupResponse = SignupSuccessResponse | SignupErrorResponse

export type UserGetSuccessResponse = {
  ok: true
  user: AuthUser
}

export type UserGetErrorResponse = {
  ok: false
  error?: string
}

export type UserGetResponse = UserGetSuccessResponse | UserGetErrorResponse
