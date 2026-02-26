import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-secondary: ${({ theme }) => theme.colors.secondary};
    --color-white: ${({ theme }) => theme.colors.white};
    --color-text: ${({ theme }) => theme.colors.text};
    --color-text-muted: ${({ theme }) => theme.colors.textMuted};
    --color-border: ${({ theme }) => theme.colors.border};
    --font-primary: ${({ theme }) => theme.fonts.primary};
    --font-secondary: ${({ theme }) => theme.fonts.secondary};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-white);
    color: var(--color-text);
    font-family: var(--font-secondary);
    margin: 0;
    min-width: 320px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-primary);
  }

  p,
  small,
  label {
    font-family: var(--font-secondary);
  }

  footer {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  button {
    background-color: var(--color-secondary);
    border: 0;
    color: var(--color-white);
    cursor: pointer;
    font: inherit;
  }
`
