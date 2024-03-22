import './globals.css';
import NewAppBar from '@/src/components/NewAppBar';
import { Metadata } from 'next';
import LayoutProvider from '@/src/components/LayoutProvider';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'วันอานันทมหิดล',
  description: 'ระบบแอดมินงานวันอานันทมหิดล',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <LayoutProvider>
          <AppRouterCacheProvider>
            <CssBaseline />
            <NewAppBar />
            <div className={styles.container}>
              {children}
            </div>
          </AppRouterCacheProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
