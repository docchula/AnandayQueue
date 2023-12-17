import {
  Stack, TextField, Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

interface RegisterFormProps {
  id: number
  count: number
}

interface RegisterFormInput {
  name: string
  pronunciation: string
  email: string
  phonenumber: string
  table: string
  location: string
  remarks: string
}

interface IButton {
  isDisabled: boolean
  buttonColor: 'primary' | 'success'
}

export default function RegisterForm({ id, count }: RegisterFormProps) {
  const [buttons, setButtons] = useState<IButton>({ isDisabled: true, buttonColor: 'primary' });
  const [formStatus, setFormStatus] = useState('new');
  const { mutate } = useSWRConfig();
  const {
    register, handleSubmit, setValue, watch, reset,
  } = useForm<RegisterFormInput>();
  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      await fetch('/api/register', {
        method: `${formStatus === 'new' ? 'POST' : 'PUT'}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          data,
        }),
      });
      reset();
      mutate('/api/participant');
      setButtons({ isDisabled: true, buttonColor: 'primary' });
    } catch {
      throw new Error('Submit failed');
    }
  };
  useEffect(() => {
    if (id) {
      const getParticipantData = async () => {
        try {
          const response = await fetch('/api/participant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setValue('name', data.name);
            setValue('location', data.location);
            setFormStatus('update');
            setButtons({ isDisabled: false, buttonColor: 'success' });
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      };
      getParticipantData();
    }
  }, [count, id, setValue]);
  return (
    <>
      <h1>ฟอร์มสำหรับลงทะเบียน</h1>
      <Button
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
        disabled={buttons.isDisabled}
        onClick={() => { reset(); setFormStatus('new'); setButtons({ isDisabled: true, buttonColor: 'primary' }); }}
      >
        กลับไปลงทะเบียนใหม่
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="ชื่อ"
            variant="outlined"
            required
            InputLabelProps={{ shrink: Boolean(watch('name')) }}
            {...register('name')}
          />
          <TextField
            label="คำอ่านชื่อ"
            variant="outlined"
            InputLabelProps={{ shrink: Boolean(watch('pronunciation')) }}
            {...register('pronunciation')}
          />
          <TextField
            label="อีเมลหรือช่องทางการติดต่อ"
            variant="outlined"
            type="email"
            InputLabelProps={{ shrink: Boolean(watch('email')) }}
            {...register('email')}
          />
          <TextField
            label="เบอร์โทรศัพท์"
            variant="outlined"
            InputLabelProps={{ shrink: Boolean(watch('phonenumber')) }}
            {...register('phonenumber', { pattern: /^0[0-9]{9}$/ })}
          />
          <TextField
            label="โต๊ะ"
            variant="outlined"
            required
            InputLabelProps={{ shrink: Boolean(watch('table')) }}
            {...register('table')}
          />
          <TextField
            label="พวงมาลา"
            variant="outlined"
            required
            InputLabelProps={{ shrink: Boolean(watch('location')) }}
            {...register('location')}
          />
          <TextField
            label="ข้อมูลอื่น ๆ"
            variant="outlined"
            InputLabelProps={{ shrink: Boolean(watch('remarks')) }}
            {...register('remarks')}
          />
          <Button variant="contained" type="submit" color={buttons.buttonColor}>
            ส่ง
          </Button>
        </Stack>
      </form>
    </>
  );
}
