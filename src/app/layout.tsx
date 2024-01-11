'use client';

import { SessionProvider } from 'next-auth/react';
import { Sarabun } from 'next/font/google';
import './globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { SWRConfig } from 'swr';
import NewAppBar from '@/src/components/NewAppBar';

const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '400', '500', '600'],
  display: 'swap',
});
const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={sarabun.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SessionProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SWRConfig
                value={{
                  fetcher: async (...args: Parameters<typeof fetch>) => {
                    const res = await fetch(...args);
                    return res.json();
                  },
                }}
              >
                <NewAppBar />
                <div style={{ margin: '1em' }}>
                  {children}
                </div>
              </SWRConfig>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
