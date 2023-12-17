import { Stack, Typography } from '@mui/material';
import SignoutButton from './SignoutButton';

interface NoAccessAlertProps {
  role: string | undefined
  text: string
}
export default function NoAccessAlert({ role, text }: NoAccessAlertProps) {
  return (
    <Stack alignItems="center" spacing={1}>
      <Typography variant="h5">
        {role}
        {' '}
        does not have access to this content.
      </Typography>
      <Typography variant="h5">{text}</Typography>
      <SignoutButton />
    </Stack>
  );
}
