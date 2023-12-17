import { config } from '@/src/lib/auth';
import { db } from '@/src/lib/db';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    try {
      const request = await req.json();

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
      if (createdParticipant) {
        return NextResponse.json({ status: 'participant was successfully created' });
      }
      return NextResponse.json({ status: 'participant failed to be created' });
    } catch (error) {
      return NextResponse.json({ status: 'participant failed to be created' });
    }
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();
    const {
      id, name, pronunciation, email, phonenumber, table, location, remarks,
    } = request;
    try {
      const updateInfo = await db.participants.update({
        where: {
          id,
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
      return NextResponse.json(updateInfo);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json(error);
    }
  }
}
