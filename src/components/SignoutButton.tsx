'use client';

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import styles from './Signout.module.css';

export default function Signout() {
  return (
    <div className={styles.container}>
      <Button variant="outlined" onClick={async () => { await signOut(); }}>
        ออกจากระบบ
      </Button>
    </div>
  );
}
