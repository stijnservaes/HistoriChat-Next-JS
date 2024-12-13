'use client'
import { createTheme } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif'
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#39A48A',
    },
    secondary: {
      main: '#a43954',
    },
  },
})

export default theme