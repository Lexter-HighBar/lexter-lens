import { createTheme } from '@mui/material/styles'

export const theme = createTheme({

  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiTypography: {
      defaultProps: {
        fontWeight: 400,
        fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {},
        
      },
    },
  },
  palette: {
    primary: {
      main: '#1D4170',
      dark: '#1d283a',
      contrastText: '#fdf0e9',
    },
    secondary: {
      main: '#f4bb51',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  }
})
