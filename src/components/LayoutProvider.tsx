'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';

const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
});

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
            {children}
          </SWRConfig>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
