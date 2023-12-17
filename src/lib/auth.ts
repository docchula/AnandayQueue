// This need to be fixed later
/* eslint-disable no-param-reassign */
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
      name: 'Ananday',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'username',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password',
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
      if (!(user === null || user === undefined)) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }: { session: Session, token: JWT }) {
      if ((Boolean(token)) && (!(session.user === null || session.user === undefined))) {
        session.user.role = token.role;
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
