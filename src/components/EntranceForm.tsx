import { Button, Stack, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSWRConfig } from 'swr';

interface EntranceFormProps {
  id: number
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

export default function EntranceForm({ id }: EntranceFormProps) {
  const [buttons, setButtons] = useState<IButton>({ isDisabled: true, buttonColor: 'primary', buttonText: 'ส่ง' });
  const [formStatus, setFormStatus] = useState('new');
  const { mutate } = useSWRConfig();
  const {
    register, handleSubmit, setValue, watch, reset,
  } = useForm<EntranceFormInput>();
  const onSubmit: SubmitHandler<EntranceFormInput> = async (data) => {
    try {
      await fetch('/api/entrance', {
        method: `${formStatus === 'new' ? 'POST' : 'PATCH'}`,
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
      setButtons({ isDisabled: true, buttonColor: 'primary', buttonText: 'ส่ง' });
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
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      };
      getParticipantData();
    }
  }, [id, setValue]);
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
        </Stack>
      </form>
    </>
  );
}
