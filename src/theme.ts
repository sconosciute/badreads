'use client';
import { Roboto } from 'next/font/google';
import { Merriweather, Montserrat, Inter } from 'next/font/google'
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['300', '400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f06543',
    },
    secondary: {
      main: '#cbac8f',
    },
    background: {
      default: '#e8e9eb',
      paper: '#e0dfd5',
    },
    success: {
      main: '#cbac8f',
    },
  },
  typography: {
    fontFamily: merriweather.style.fontFamily,
    h1: {
      fontFamily: inter.style.fontFamily
    },
    h2: {
      fontFamily: inter.style.fontFamily,
    },
    h3: {
      fontFamily: inter.style.fontFamily,
    },
    h4: {
      fontFamily: inter.style.fontFamily,
    },
    h5: {
      fontFamily: inter.style.fontFamily,
    },
    h6: {
      fontFamily: inter.style.fontFamily,
    },
    button: {
      fontFamily: inter.style.fontFamily,
      fontWeight: 540,
    }
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default lightTheme;
