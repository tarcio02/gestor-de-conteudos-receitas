import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './app/App'
import { AppProviders } from './app/providers'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppProviders>
        <App />
      </AppProviders>
    </ThemeProvider>
  </StrictMode>,
)
