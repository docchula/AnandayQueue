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
      return NextResponse.json({
        success: true,
        message: 'Participant created successfully',
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: 'Failed to create participant',
      });
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
      return NextResponse.json(updateInfo);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json(error);
    }
  }
}
