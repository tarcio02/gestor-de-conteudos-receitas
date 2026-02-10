import { colorVariables } from './variables'

export const theme = {
  colors: {
    background: colorVariables.white,
    surface: colorVariables.white,
    text: colorVariables.text,
    textMuted: colorVariables.textMuted,
    primary: colorVariables.primary,
    secondary: colorVariables.secondary,
    white: colorVariables.white,
    border: colorVariables.border,
  },
} as const

export type AppTheme = typeof theme
