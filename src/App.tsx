import { useCallback, useEffect, useMemo, useState, createContext, useContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Portfolio from '@/Portfolio'

type ColorMode = 'light' | 'dark'

interface ColorModeContextValue {
  toggleColorMode: () => void
  mode: ColorMode
}

const ColorModeContext = createContext<ColorModeContextValue>({
  toggleColorMode: () => {},
  mode: 'dark',
})

export function useColorMode(): ColorModeContextValue {
  return useContext(ColorModeContext)
}

const lightPalette = {
  mode: 'light' as const,
  primary: { main: '#4f46e5' },
  secondary: { main: '#d97706' },
  background: { default: '#f1f5f9', paper: '#ffffff' },
}

const darkPalette = {
  mode: 'dark' as const,
  primary: { main: '#6366f1' },
  secondary: { main: '#f59e0b' },
  background: { default: '#0f172a', paper: '#1e293b' },
}

function App(): JSX.Element {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

  const [mode, setMode] = useState<ColorMode>(() => {
    if (typeof window === 'undefined') {
      return prefersDark ? 'dark' : 'light'
    }
    const stored = window.localStorage.getItem('color-mode') as ColorMode | null
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('color-mode', mode)
    }
  }, [mode])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('color-mode') as ColorMode | null
    if (stored) return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event: MediaQueryListEvent) => {
      setMode(event.matches ? 'dark' : 'light')
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleColorMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        palette: mode === 'light' ? lightPalette : darkPalette,
        typography: { fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(',') },
        shape: { borderRadius: 12 },
      }),
    [mode],
  )

  const contextValue = useMemo<ColorModeContextValue>(
    () => ({ toggleColorMode, mode }),
    [toggleColorMode, mode],
  )

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Portfolio />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
