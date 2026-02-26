type ThemeColors = {
  background: string
  surface: string
  text: string
  textMuted: string
  primary: string
  secondary: string
  white: string
  border: string
}

type ThemeFonts = {
  primary: string
  secondary: string
}

export type AppTheme = {
  colors: ThemeColors
  fonts: ThemeFonts
}

export const defaultTheme: AppTheme = {
  colors: {
    background: '#ffffff',
    surface: '#ffffff',
    text: '#1f2933',
    textMuted: '#52606d',
    primary: '#a80707',
    secondary: '#ffa801',
    white: '#ffffff',
    border: '#d9e2ec',
  },
  fonts: {
    primary: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    secondary: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
}

export type ThemeOverrides = {
  colors?: {
    primary?: string
    secondary?: string
  }
  fonts?: {
    primary?: string
    secondary?: string
  }
}

export function buildTheme(overrides: ThemeOverrides = {}): AppTheme {
  return {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...(overrides.colors ?? {}),
    },
    fonts: {
      ...defaultTheme.fonts,
      ...(overrides.fonts ?? {}),
    },
  }
}
