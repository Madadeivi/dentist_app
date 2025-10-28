import { useThemeStore } from '@/store'
import { lightColors, darkColors, ColorScheme } from './colors'

export const useThemeColors = (): ColorScheme => {
  const { isDarkMode } = useThemeStore()
  return isDarkMode ? darkColors : lightColors
}

