import { type DefaultSession } from 'next-auth';

export enum Role {
  user = 'user',
  admin = 'admin',
}

declare module 'next-auth' {
  interface User {
    name: string
    email: string
    role: string
  }

  interface Session extends DefaultSession {
    user?: User
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    name: string
    email: string
  }
}
