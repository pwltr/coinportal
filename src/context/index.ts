import { createContext } from 'react'
import { PaletteMode } from '~/styles/theme'

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: (mode: PaletteMode) => {},
})
