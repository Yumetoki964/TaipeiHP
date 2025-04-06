import { createTheme } from '@mui/material/styles';

// 夢時商業股份有限公司のブランドカラー
const brandColors = {
  gold: '#d4af37',
  darkGrey: '#1a1a1a',
  lightGrey: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#ffffff',
  },
};

// テーマの作成
const theme = createTheme({
  palette: {
    primary: {
      main: brandColors.gold,
      dark: '#b8860b',
      light: '#e6c158',
      contrastText: brandColors.white,
    },
    secondary: {
      main: brandColors.darkGrey,
      contrastText: brandColors.white,
    },
    background: {
      default: brandColors.white,
      paper: brandColors.white,
      dark: brandColors.darkGrey,
      light: brandColors.lightGrey,
    },
    text: {
      primary: brandColors.text.primary,
      secondary: brandColors.text.secondary,
      light: brandColors.text.light,
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Noto Sans TC',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
  },
  // レスポンシブデザイン用のカスタムブレークポイントを追加
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;