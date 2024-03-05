import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { DefaultSession, NextAuthOptions as NextAuthConfig } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { type JWT } from 'next-auth/jwt';

interface User {
  name: string
  email: string
  role: string
}

interface Session extends DefaultSession {
  user?: User
}

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'AnandayQueue',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'username',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        const api = `${String(process.env.NEXT_PUBLIC_URL)}/api/login`;

        const res = await fetch(api, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (data.status === 'ok') {
          return data;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { user: User, token: JWT }) {
      if (user) {
        return { ...token, role: user.role };
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token && session.user) {
        return { ...session, user: { ...session.user, role: token.role } };
      }
      return session;
    },
  },
  session: {
    maxAge: 2 * 60 * 60, // 2 hours
  },

} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export async function auth(
  ...args:
  | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
  | [NextApiRequest, NextApiResponse]
  | []
) {
  return getServerSession(...args, config);
}
