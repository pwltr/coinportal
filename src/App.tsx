// import { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'

import { useLocalStorage, useMediaQuery } from '~/hooks'
import AppRouter from '~/components/AppRouter'
import AppDebugger from '~/components/AppDebugger'
import { ThemeContext } from '~/context'
import GlobalStyle from '~/styles/global'
import { getDesignTokens, PaletteMode } from '~/styles/theme'

// init react-i18next
import '~/utils/i18n'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useLocalStorage<PaletteMode>('theme', prefersDarkMode ? 'dark' : 'light')

  // Update the theme only if the mode changes
  // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  console.log('prefersDarkMode', prefersDarkMode)
  console.log('mode', mode)

  return (
    <>
      <GlobalStyle />

      <ThemeContext.Provider value={{ theme: mode, setTheme: setMode }}>
        <AppRouter />
        <Toaster position="bottom-left" toastOptions={{ duration: 5000 }} />
        {import.meta.env.DEV && <AppDebugger />}
      </ThemeContext.Provider>
    </>
  )
}

export default App
