export interface GoogleSheetsRecipeRow {
  id: string
  title: string
  description: string
  ingredients: string
  instructions: string
  createdAt: string
  updatedAt: string
}

export interface GoogleSheetsClientConfig {
  webAppUrl: string
}

export class GoogleSheetsClient {
  private readonly config: GoogleSheetsClientConfig

  constructor(config: GoogleSheetsClientConfig) {
    this.config = config
  }

  async fetchRecipes(): Promise<GoogleSheetsRecipeRow[]> {
    const response = await fetch(this.config.webAppUrl)
    if (!response.ok) {
      throw new Error('Falha ao buscar receitas no Google Sheets.')
    }

    return (await response.json()) as GoogleSheetsRecipeRow[]
  }
}
