'use client';

import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
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
    </SessionProvider>
  );
}
