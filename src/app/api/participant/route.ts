import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { config } from '@/src/lib/auth';
import { db } from '@/src/lib/db';

export async function GET() {
  const session = await getServerSession(config);
  if (session !== null) {
    const data = await db.participants.findMany();
    return NextResponse.json(data);
  }
  return NextResponse.json({ status: 'error' });
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
      return NextResponse.json(updateStatus);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json(error);
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
      return NextResponse.json(response);
    } catch {
      return NextResponse.json({ status: 'participant not found' });
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
      return NextResponse.json({ status: 'participant was deleted' });
    } catch {
      return NextResponse.json({ status: 'participant not found' });
    }
  }
}
