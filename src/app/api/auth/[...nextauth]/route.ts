import { config } from '@/src/lib/auth';
import NextAuth from 'next-auth/next';

const handler = NextAuth(config);
export { handler as GET, handler as POST };
