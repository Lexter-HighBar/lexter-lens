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
        fontWeight: 200,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          
        }
      },
    }
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
    fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
  
  },
  
})
