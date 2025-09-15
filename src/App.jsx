import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Portfolio from './Portfolio'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#f59e0b',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Portfolio />
    </ThemeProvider>
  )
}

export default App