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
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import SigninForm from '@/src/components/SigninForm';
import useAllParticipant from '@/src/lib/hooks/useAllParticipant';
import NoAccessAlert from '@/src/components/NoAccessAlert';
import EntranceForm from '@/src/components/EntranceForm';
import styles from '@/src/app/layout.module.css';

export default function Entrance() {
  const { data: session } = useSession();
  const { allParticipant } = useAllParticipant();
  const [id, setId] = useState(0);
  const [count, setCount] = useState(0);

  if (session?.user?.role === 'registrar' || session?.user?.role === 'admin') {
    const participantsNotRegistered = Array.isArray(allParticipant)
      ? allParticipant.filter((participant) => !participant.is_registered)
      : [];
    return (
      <>
        <Container>
          <EntranceForm id={id} count={count} />
        </Container>
        <br />
        <Container>
          <h1> ลงทะเบียนดอกไม้ ที่ยังไม่ลงทะเบียน</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ชื่อ</TableCell>
                  <TableCell align="left">พวงมาลา</TableCell>
                  <TableCell align="left">การดำเนินการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participantsNotRegistered?.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {participant.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {participant.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          setId(participant.id);
                          setCount(count + 1);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <br />
        <div className={styles.signoutContainer}>
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
