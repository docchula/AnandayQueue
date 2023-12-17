'use client';

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';

export default function Signout() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Button variant="outlined" onClick={async () => { await signOut(); }}>
        ออกจากระบบ
      </Button>
    </div>
  );
}
