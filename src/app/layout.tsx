import { Sarabun } from 'next/font/google';
import './globals.css';
import NewAppBar from '@/src/components/NewAppBar';
import { Metadata } from 'next';
import LayoutProvider from '@/src/components/LayoutProvider';
import styles from './layout.module.css';

const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '400', '500', '600'],
  display: 'swap',
});

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
    <html lang="th" className={sarabun.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <LayoutProvider>
          <NewAppBar />
          <div className={styles.container}>
            {children}
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
