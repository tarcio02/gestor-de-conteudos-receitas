import { authStorage } from '../../../shared/storage/authStorage'

export function isAuthenticated(): boolean {
  return Boolean(authStorage.getToken())
}
