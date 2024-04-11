import { NextResponse } from 'next/server';
import { db } from '@/src/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const request = await req.json();
  const { email, password } = request;

  const user = await db.users.findUnique({
    where: { email },
  });

  if (user === null) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }
  // Generate Password
  // bcrypt.hash('password', 10, (hash) => {
  //   console.log(hash);
  // });
  const passwordsMatch = bcrypt.compareSync(password, user.password);
  if (passwordsMatch) {
    const authorizedResponse = {
      authorized: true,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return NextResponse.json(authorizedResponse, { status: 200 });
  }
  return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
}
