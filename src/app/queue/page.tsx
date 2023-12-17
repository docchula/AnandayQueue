'use client';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import SigninForm from '@/src/components/SigninForm';
import { Participants } from '@/src/lib/types/participant';
import useAllParticipant from '@/src/lib/hooks/useAllParticipant';

export default function Queue() {
  const { data: session } = useSession();
  const { allParticipant } = useAllParticipant();
  const participantFiltered = Array.isArray(allParticipant)
    ? allParticipant.filter((p: Participants) => p.status === 2)
    : [];
  if (session !== null) {
    return (
      <>
        <div>
          <Typography variant="h4" align="center" fontWeight="bold">
            เรียกคิวแล้ว
          </Typography>
        </div>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1500, marginX: 'auto' }}
        >
          <Table sx={{ minWidth: 65 }} aria-label="simple table">
            <TableBody>
              {participantFiltered?.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {participant.name}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  return (
    <SigninForm />
  );
}
