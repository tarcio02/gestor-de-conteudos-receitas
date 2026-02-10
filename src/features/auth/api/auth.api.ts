import { http } from '../../../shared/api/Http'
import type { LoginInput, LoginResponse } from '../model/auth.types'

export const authApi = {
  login(input: LoginInput) {
    return http<LoginResponse>('/auth/login', { method: 'POST', body: input })
  },
}
