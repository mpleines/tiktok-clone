import { Post, User } from '@prisma/client';
import { DefaultSession } from 'inspector';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
      fullname: string;
      followedBy: User[];
      following: User[];
    } & DefaultSession['user'];
  }
}
