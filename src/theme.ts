'use client';

import { Sarabun } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const sarabun = Sarabun({
  weight: ['400', '700'],
  subsets: ['thai'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: sarabun.style.fontFamily,
  },
});

export default theme;
