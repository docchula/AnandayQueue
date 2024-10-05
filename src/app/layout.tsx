import './globals.css';
import NewAppBar from '@/src/components/NewAppBar';
import { Metadata } from 'next';
import LayoutProvider from '@/src/components/LayoutProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import styles from './layout.module.css';
import ToastProvider from '../components/ToastProvider';
import 'react-toastify/dist/ReactToastify.css';

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
            <main>
              <NewAppBar />
              <ToastProvider>
                <div className={styles.container}>
                  {children}
                </div>
              </ToastProvider>
            </main>
          </AppRouterCacheProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
