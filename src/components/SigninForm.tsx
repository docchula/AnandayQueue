'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Backdrop,
  Button, CircularProgress, Container, Stack, TextField, Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SigninFormInput {
  email: string
  password: string
}

export default function SigninForm() {
  const [open, setOpen] = useState(false);

  const {
    register, handleSubmit, watch, reset,
  } = useForm<SigninFormInput>();
  const [error, setError] = useState(false);
  const onSubmit: SubmitHandler<SigninFormInput> = async (data) => {
    setOpen(true);
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setOpen(false);
    if ((result?.error) !== null) {
      setError(true);
      reset();
    }
  };
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="sm">
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Typography variant="h5" align="center">กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</Typography>
              <TextField
                label="อีเมล"
                variant="outlined"
                type="email"
                required
                InputLabelProps={{ shrink: Boolean(watch('email')) }}
                {...register('email')}
              />
              <TextField
                label="รหัสผ่าน"
                variant="outlined"
                type="password"
                required
                InputLabelProps={{ shrink: Boolean(watch('password')) }}
                {...register('password')}
              />
              <Button variant="contained" type="submit">
                เข้าสู่ระบบ
              </Button>
              {error && <Typography color="red" align="center">อีเมลหรือรหัสผ่านไม่ถูกต้อง</Typography>}
            </Stack>
          </form>
        </Stack>
      </Container>
    </>
  );
}
