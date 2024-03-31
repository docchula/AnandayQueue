'use client';

import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSWRConfig } from 'swr';
import { Participants } from '../lib/types/participant';

interface ParticipantsFilteredProps {
  data: Participants[]
  continueTo: string
  backTo: string
  stageName: string
}

export default function ParticipantFiltered({
  data,
  continueTo,
  backTo,
  stageName,
}: ParticipantsFilteredProps) {
  const { mutate } = useSWRConfig();
  const handleStatusUpdate = async (change: number, id: number, status: number | null) => {
    try {
      if (typeof status === 'number') {
        await fetch('/api/participant', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            status: status + change,
          }),
        });
        await mutate('/api/participant');
      }
    } catch {
      throw new Error('handleStatusUpdate failed');
    }
  };
  const rows = data?.map((participant) => (
    <TableRow key={participant.id}>
      <TableCell>{participant.name}</TableCell>
      <TableCell>{participant.pronunciation}</TableCell>
      <TableCell>{participant.table}</TableCell>
      <TableCell>{participant.location}</TableCell>
      <TableCell>
        {continueTo !== ''
          && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleStatusUpdate(1, participant.id, participant.status)}
            >
              {continueTo}
            </Button>
          )}
        {' '}
        {backTo !== ''
          && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleStatusUpdate(-1, participant.id, participant.status)}
            >
              {backTo}
            </Button>
          )}
      </TableCell>
    </TableRow>
  ));
  return (
    <Container>
      <h1>
        {stageName}
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 555 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ชื่อ</TableCell>
              <TableCell align="left">คำอ่าน</TableCell>
              <TableCell align="left">โต๊ะ</TableCell>
              <TableCell align="left">พวงมาลา</TableCell>
              <TableCell align="left" sx={{ width: '21em' }}>
                การดำเนินการ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
