import { Post } from '@prisma/client';
import { Session } from 'inspector';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
      fullname: string;
      posts: Post[];
    } & Session['user'];
  }
}
