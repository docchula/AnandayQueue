'use client';

import { useSession } from 'next-auth/react';
import useAllParticipant from '@/src/lib/hooks/useAllParticipant';
import SignoutButton from '@/src/components/SignoutButton';
import SigninForm from '@/src/components/SigninForm';
import NoAccessAlert from '@/src/components/NoAccessAlert';
import { Participants } from '@/src/lib/types/participant';
import ParticipantFiltered from '@/src/components/ParticipantFiltered';

const stage = [
  {
    stageNumber: 5,
    continueTo: 'พิธีกรอ่านชื่อแล้ว',
    backTo: 'ย้อนกลับ',
    stageName: 'รออ่านชื่อ',
  },
  {
    stageNumber: 6,
    continueTo: 'วางเสร็จแล้ว',
    backTo: 'ย้อนกลับ',
    stageName: 'กำลังวางพวงมาลา',
  },
];

export default function McOuside() {
  const { data: session } = useSession();
  const { allParticipant } = useAllParticipant();
  if (session?.user?.role === 'admin' || session?.user?.role === 'mcoutside') {
    return (
      <>
        {stage.map((data) => {
          const participantFiltered = Array.isArray(allParticipant)
            ? allParticipant.filter((p: Participants) => p.status === data.stageNumber)
            : [];
          return (
            <div key={data.stageNumber}>
              <ParticipantFiltered
                data={participantFiltered}
                continueTo={data.continueTo}
                backTo={data.backTo}
                stageName={data.stageName}
              />
            </div>
          );
        })}
        <div style={{ marginTop: '1em' }}>
          <SignoutButton />
        </div>
      </>
    );
  }
  if (session?.user?.role !== 'admin' && (session !== null)) {
    const role = session?.user?.role;
    return (
      <NoAccessAlert role={role} text="only admin and mc-outside have access to this page." />
    );
  }
  return <SigninForm />;
}
