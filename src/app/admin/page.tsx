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
    stageNumber: 0,
    continueTo: 'เรียงพวงแล้ว',
    backTo: '',
    stageName: 'ลงทะเบียนแล้ว',
  },
  {
    stageNumber: 1,
    continueTo: 'เรียกชื่อแล้ว',
    backTo: 'ย้อนกลับ',
    stageName: 'เรียงพวงแล้ว',
  },
  {
    stageNumber: 2,
    continueTo: 'พบพวงมาลาแล้ว',
    backTo: 'ย้อนกลับ',
    stageName: 'เรียกคิวแล้ว',
  },
  {
    stageNumber: 3,
    continueTo: 'ออกจากอปร.แล้ว',
    backTo: 'ย้อนกลับ',
    stageName: 'พบพวงมาลาแล้ว',
  },
  {
    stageNumber: 4,
    continueTo: 'ถึงเต็นท์ MC แล้ว',
    backTo: 'ย้อนกลับ',
    stageName: 'เข้าลาน ร.๘ แล้ว',
  },
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
  {
    stageNumber: 7,
    continueTo: '',
    backTo: 'ย้อนกลับ',
    stageName: 'เสร็จสิ้น',
  },
];

export default function Admin() {
  const { data: session } = useSession();
  const { allParticipant } = useAllParticipant();
  if (session?.user?.role === 'admin') {
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
      <NoAccessAlert role={role} text="only admin has access to this page." />
    );
  }
  return <SigninForm />;
}
