import {
  Button, Stack, TextField, Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

interface EntranceFormProps {
  id: number
  count: number
}

interface EntranceFormInput {
  name: string
  location: string
}

interface IButton {
  isDisabled: boolean
  buttonColor: 'primary' | 'warning'
  buttonText: string
}

export default function EntranceForm({ id, count }: EntranceFormProps) {
  const [buttons, setButtons] = useState<IButton>({ isDisabled: true, buttonColor: 'primary', buttonText: 'ส่ง' });
  const [formStatus, setFormStatus] = useState('new');
  const [error, setError] = useState('');
  const { mutate } = useSWRConfig();
  const {
    register, handleSubmit, setValue, watch, reset,
  } = useForm<EntranceFormInput>();
  const onSubmit: SubmitHandler<EntranceFormInput> = async (data) => {
    try {
      const res = await fetch('/api/entrance', {
        method: `${formStatus === 'new' ? 'POST' : 'PATCH'}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          data,
        }),
      });
      if (res.ok) {
        reset();
        if (formStatus === 'new') {
          toast.success('ลงทะเบียนสำเร็จ');
        } else {
          toast.success('แก้ไขสำเร็จ');
          setFormStatus('new');
        }
        mutate('/api/participant');
        setButtons({ isDisabled: true, buttonColor: 'primary', buttonText: 'ส่ง' });
      } else {
        setError('การส่งข้อมูลไม่สำเร็จ');
      }
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
            setButtons({ isDisabled: false, buttonColor: 'warning', buttonText: 'แก้ไข' });
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (e: any) {
          console.error('Error:', e.message);
        }
      };
      getParticipantData();
    }
  }, [count, id, setValue]);
  return (
    <>
      <h1>ลงทะเบียนดอกไม้</h1>
      <Button
        variant="outlined"
        onClick={async () => { reset(); setFormStatus('new'); setButtons({ isDisabled: true, buttonColor: 'primary', buttonText: 'ส่ง' }); }}
        disabled={buttons.isDisabled}
        sx={{ marginBottom: '1rem' }}
      >
        กลับไปลงทะเบียนดอกไม้ใหม่
      </Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="ชื่อ"
            variant="outlined"
            type="text"
            required
            InputLabelProps={{ shrink: Boolean(watch('name')) }}
            {...register('name')}
          />
          <TextField
            label="พวงมาลา"
            variant="outlined"
            required
            InputLabelProps={{ shrink: Boolean(watch('location')) }}
            {...register('location')}
          />
          <Button variant="contained" type="submit" color={buttons.buttonColor}>
            {buttons.buttonText}
          </Button>
          <Typography color="red" align="center">{error}</Typography>
        </Stack>
      </form>
    </>
  );
}
