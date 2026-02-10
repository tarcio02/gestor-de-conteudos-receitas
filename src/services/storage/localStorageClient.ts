export class LocalStorageClient {
  getItem<T>(key: string): T | null {
    const rawValue = window.localStorage.getItem(key)
    if (!rawValue) return null

    try {
      return JSON.parse(rawValue) as T
    } catch {
      return null
    }
  }

  setItem<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key)
  }
}

export const localStorageClient = new LocalStorageClient()
