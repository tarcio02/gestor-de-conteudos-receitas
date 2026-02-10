const KEY = 'auth_token'

export const authStorage = {
  getToken() {
    return localStorage.getItem(KEY)
  },
  setToken(token: string) {
    localStorage.setItem(KEY, token)
  },
  clear() {
    localStorage.removeItem(KEY)
  },
}
