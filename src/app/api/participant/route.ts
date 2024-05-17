import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { config } from '@/src/lib/auth';
import { db } from '@/src/lib/db';

export async function GET() {
  const session = await getServerSession(config);
  if (session !== null) {
    const data = await db.participants.findMany();
    return NextResponse.json(data, { status: 200 });
  }
  return NextResponse.json({ status: 401 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();
    try {
      const updateStatus = await db.participants.update({
        where: {
          id: request.id,
        },
        data: {
          status: request.status,
        },
      });
      return NextResponse.json(updateStatus, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Paticipant was not updated' }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();
    try {
      const response = await db.participants.findUnique({
        where: {
          id: request.id,
        },
      });
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Participant was not found' }, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(config);
  if (session) {
    const request = await req.json();
    try {
      await db.participants.delete({
        where: {
          id: request.id,
        },
      });
      return NextResponse.json({ message: 'Participant was deleted' }, { status: 200 });
    } catch (errror) {
      return NextResponse.json({ error: 'Participant was not found' }, { status: 500 });
    }
  }
}
