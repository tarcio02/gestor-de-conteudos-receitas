import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './app/App'
import { AppProviders } from './app/providers'
import { usePublicStylesConfig } from './features/styles-config/hooks'
import { GlobalStyle } from './styles/GlobalStyle'
import { buildTheme } from './styles/theme'

const SANS_FONT_STACK = '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
const SERIF_FONT_STACK = 'Georgia, "Times New Roman", Times, serif'

function isValidHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(String(value ?? '').trim())
}

function resolveFontFamily(value: string, fallback: string): string {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (normalized === 'serif') return SERIF_FONT_STACK
  if (normalized === 'sans') return SANS_FONT_STACK
  return fallback
}

function RootApp() {
  const { data } = usePublicStylesConfig()

  const primaryColor = String(data?.primaryColor ?? '').trim()
  const secondaryColor = String(data?.secondaryColor ?? '').trim()

  const theme = buildTheme({
    colors: {
      primary: isValidHexColor(primaryColor) ? primaryColor : undefined,
      secondary: isValidHexColor(secondaryColor) ? secondaryColor : undefined,
    },
    fonts: {
      primary: resolveFontFamily(String(data?.primaryFont ?? ''), SANS_FONT_STACK),
      secondary: resolveFontFamily(String(data?.secondaryFont ?? ''), SANS_FONT_STACK),
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RootApp />
    </AppProviders>
  </StrictMode>,
)
