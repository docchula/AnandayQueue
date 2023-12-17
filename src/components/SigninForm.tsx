'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Button, Container, Stack, TextField, Typography,
} from '@mui/material';

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if ((result?.error) !== null) {
      setError(true);
      setEmail('');
      setPassword('');
    }
  };
  return (
    <Container maxWidth="sm">
      <Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center">กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</Typography>
            <TextField
              id="email"
              label="อีเมล"
              variant="outlined"
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
              required
            />
            <TextField
              id="password"
              label="รหัสผ่าน"
              variant="outlined"
              type="password"
              name="pass"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              required
            />
            <Button variant="contained" type="submit">
              เข้าสู่ระบบ
            </Button>
            {error && <Typography color="red" align="center">ไม่สามารถเข้าสู่ระบบได้</Typography>}
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
