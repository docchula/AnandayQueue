'use client';

import SignoutButton from '@/src/components/SignoutButton';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SigninForm from '@/src/components/SigninForm';
import useAllParticipant from '@/src/lib/hooks/useAllParticipant';
import { Participants } from '@/src/lib/types/participant';
import NoAccessAlert from '@/src/components/NoAccessAlert';
import RegisterForm from '@/src/components/RegisterForm';
import { useSWRConfig } from 'swr';

export default function Register() {
  const { data: session } = useSession();
  const { allParticipant } = useAllParticipant();
  const [id, setId] = useState(0);
  const [count, setCount] = useState(0);
  const { mutate } = useSWRConfig();

  if (session?.user?.role === 'registrar' || session?.user?.role === 'admin') {
    const deleteParticipant = async (deleteId: number) => {
      try {
        await fetch('/api/participant', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: deleteId,
          }),
        });
        mutate('/api/participant');
      } catch {
        throw new Error('Submit failed');
      }
    };
    const participantsNotFullyRegistered = Array.isArray(allParticipant)
      ? allParticipant.filter((participant) => !participant.is_registered)
      : [];
    const participantsRegistered = Array.isArray(allParticipant)
      ? allParticipant.filter((participant) => participant.is_registered)
      : [];
    return (
      <>
        <Container>
          <RegisterForm id={id} count={count} />
          <br />
          <h1>หน่วยงานที่ลงทะเบียนดอกไม้แล้ว</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ชื่อ</TableCell>
                  <TableCell align="left" sx={{ width: '21em' }}>
                    การดำเนินการ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participantsNotFullyRegistered?.map((participant: Participants) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {participant.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setId(participant.id);
                          setCount(count + 1);
                        }}
                      >
                        ลงทะเบียน
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <br />
        <Container>
          <h1>หน่วยงานที่ลงทะเบียนสมบูรณ์แล้ว</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ชื่อ</TableCell>
                  <TableCell align="left" sx={{ width: '21em' }}>
                    ยกเลิกการดำเนินการ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participantsRegistered?.map((participant: Participants) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {participant.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={
                          () => deleteParticipant(participant.id)
                        }
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <br />
        <div style={{ marginTop: '1em' }}>
          <SignoutButton />
        </div>
      </>
    );
  }
  if (session?.user?.role !== 'admin' && (session !== null)) {
    const role = session?.user?.role;
    return (
      <NoAccessAlert role={role} text="only admin has access to this page." />
    );
  }
  return <SigninForm />;
}
