import { config } from '@/src/lib/auth';
import { db } from '@/src/lib/db';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();
    try {
      const createdParticipant = await db.participants.create({
        data: {
          name: request.data.name,
          pronunciation: request.data.pronunciation,
          email: request.data.email,
          phonenumber: request.data.phonenumber,
          table: request.data.table,
          location: request.data.location,
          remarks: request.data.remarks,
        },
      });
      return NextResponse.json({ createdParticipant, message: 'Participant was successfully created' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Participant was failed to be created' }, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();
    const {
      name, pronunciation, email, phonenumber, table, location, remarks,
    } = request.data;
    try {
      const updateInfo = await db.participants.update({
        where: {
          id: request.id,
        },
        data: {
          name,
          pronunciation,
          email,
          phonenumber,
          table,
          location,
          remarks,
          is_registered: true,
          status: 0,
        },
      });
      return NextResponse.json(updateInfo, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Participant was failed to be updated' }, { status: 500 });
    }
  }
}
