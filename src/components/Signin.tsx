'use client';

import { Button, Card } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function Signin() {
  return (
    <>
      <br />
      <div>
        <Card variant="outlined">
          <h1 style={{ position: 'relative' }}>กรุณาเข้าสู่ระบบ</h1>
          <Button variant="contained" onClick={async () => { await signIn(); }}>
            เข้าสู่ระบบ
          </Button>
          <p>
            ฝ่ายเทคโนโลยีสารสนเทศ สโมสรนิสิตคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </Card>
      </div>
    </>
  );
}
