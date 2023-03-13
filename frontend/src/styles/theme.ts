import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#d5e6ff',
        color: '#011627',
      },
    },
  },
  breakpoints: {
    s: '20em', //320px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '85.375em', // 1366px
    '3xl': '90em', //1440px
    '4xl': '120em', //1920px,
  },
});
