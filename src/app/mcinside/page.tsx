'use client';

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import SigninForm from '@/src/components/SigninForm';
import useAllParticipant from '@/src/lib/hooks/useAllParticipant';
import { Participants } from '@/src/lib/types/participant';

export default function McInside() {
  const { data: session } = useSession();
  const { allParticipant } = useAllParticipant();
  const participantFiltered = Array.isArray(allParticipant)
    ? allParticipant.filter((p: Participants) => p.status === 2)
    : [];
  if (session !== null) {
    return (
      <Container>
        <div>
          <Typography variant="h4" align="center" fontWeight="bold">
            MC-inside
          </Typography>
          <h1>
            เรียกคิวแล้ว
          </h1>
        </div>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1500, marginX: 'auto' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ชื่อ</TableCell>
                <TableCell align="left">คำอ่าน</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participantFiltered?.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {participant.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {participant.pronunciation}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
  return (
    <SigninForm />
  );
}
