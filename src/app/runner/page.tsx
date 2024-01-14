'use client';

import { useSession } from 'next-auth/react';
import useAllParticipant from '@/src/lib/hooks/useAllParticipant';
import SignoutButton from '@/src/components/SignoutButton';
import SigninForm from '@/src/components/SigninForm';
import NoAccessAlert from '@/src/components/NoAccessAlert';
import { Participants } from '@/src/lib/types/participant';
import ParticipantFiltered from '@/src/components/ParticipantFiltered';
import styles from '@/src/app/layout.module.css';

const stage = [
  {
    stageNumber: 0,
    continueTo: 'เรียงพวงแล้ว',
    backTo: '',
    stageName: 'ลงทะเบียนแล้ว',
  },
];

export default function Runner() {
  const { data: session } = useSession();
  const { allParticipant } = useAllParticipant();
  if (session?.user?.role === 'admin' || session?.user?.role === 'runner') {
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
        <div className={styles.signoutContainer}>
          <SignoutButton />
        </div>
      </>
    );
  }
  if (session?.user?.role !== 'admin' && (session !== null)) {
    const role = session?.user?.role;
    return (
      <NoAccessAlert role={role} text="only admin and runner have access to this page." />
    );
  }
  return <SigninForm />;
}
