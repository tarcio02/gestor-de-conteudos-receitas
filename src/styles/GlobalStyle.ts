import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-secondary: ${({ theme }) => theme.colors.secondary};
    --color-white: ${({ theme }) => theme.colors.white};
    --color-text: ${({ theme }) => theme.colors.text};
    --color-text-muted: ${({ theme }) => theme.colors.textMuted};
    --color-border: ${({ theme }) => theme.colors.border};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-white);
    color: var(--color-text);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    min-width: 320px;
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
