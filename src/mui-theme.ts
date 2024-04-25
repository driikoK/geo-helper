import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4089d2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#000000'
    }
  },
  typography: {
    fontFamily: '"Montserrat"',
  },
});

export default theme;