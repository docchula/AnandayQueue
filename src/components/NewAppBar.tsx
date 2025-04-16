'use client';

import {
  AppBar, Box, Button, Chip, Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import mdcuLogo from '@/public/image/mdcu-logo.webp';
import smcu from '@/public/image/smcu.webp';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './NewAppBar.module.css';

export default function NewAppBar() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const router = useRouter();

  function convertArabictoThaiNumber(date: number) {
    return date.toString().replace(/\d/g, d => String.fromCharCode(0x0E50 + Number(d)));
  }

  const currentYear = new Date().getFullYear();
  const currentThaiYear = convertArabictoThaiNumber(currentYear + 543);
  return (
    <AppBar
      position="static"
      sx={{
        padding: '1rem',
        backgroundColor: '#f1f5f9',
        color: '#000000',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            router.push('/');
          }}
          className={styles.homeButton}
        >
          <Image
            src={mdcuLogo}
            height={32}
            width={(121 / 120) * 32}
            alt="MDCU Logo"
            className={styles.mdcu}
          />
          <Image
            src={smcu}
            height={32}
            width={(168 / 226) * 32}
            alt="SMCU Logo"
            className={styles.smcu}
          />
          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            วันอานันทมหิดล {currentThaiYear}
          </Typography>
        </div>
        {(session !== null && session !== undefined)
          ? (
            <div>
              <Chip
                label={role}
                color="primary"
                sx={{ marginRight: '0.5rem' }}
              />
              <Button variant="outlined" onClick={async () => { await signOut(); }}>
                ออกจากระบบ
              </Button>
            </div>
          )
          : null}
      </Box>
    </AppBar>
  );
}
