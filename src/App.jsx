import React, { useCallback, useEffect, useMemo, useState, createContext, useContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Portfolio from './Portfolio'

// Context to allow toggle access from nested components if needed
const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'dark' })

const lightPalette = {
  mode: 'light',
  primary: { main: '#4f46e5' }, // indigo-600
  secondary: { main: '#d97706' }, // amber-600
  background: { default: '#f1f5f9', paper: '#ffffff' }, // slate-100 / white
}

const darkPalette = {
  mode: 'dark',
  primary: { main: '#6366f1' },
  secondary: { main: '#f59e0b' },
  background: { default: '#0f172a', paper: '#1e293b' },
}

export function useColorMode() {
  return useContext(ColorModeContext)
}

function App() {
  // Detect system preference on first load (SSR safe pattern using lazy init)
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [mode, setMode] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('color-mode') : null
    return stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light')
  })

  // Update html class for Tailwind and persist setting
  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('color-mode', mode)
  }, [mode])

  // Listen to system changes only if user hasn't chosen explicitly (optional) - here once at mount if no stored pref
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const stored = localStorage.getItem('color-mode')
    if (stored) return // user explicit choice overrides
    const handler = (e) => setMode(e.matches ? 'dark' : 'light')
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
    [mode]
  )

  const contextValue = useMemo(() => ({ toggleColorMode, mode }), [toggleColorMode, mode])

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