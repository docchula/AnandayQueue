import { config } from '@/src/lib/auth';
import { db } from '@/src/lib/db';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();

    const { name, location } = request.data;
    try {
      await db.participants.create({
        data: {
          name,
          location,
          is_registered: false,
        },
      });
      return NextResponse.json({ message: 'Participant was created successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Participant was failed to be created' }, { status: 500 });
    }
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();
    const { name, location } = request.data;
    try {
      const updateInfo = await db.participants.update({
        where: {
          id: request.id,
        },
        data: {
          name,
          location,
        },
      });
      return NextResponse.json(updateInfo, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Participant was failed to be updated' }, { status: 500 });
    }
  }
}
