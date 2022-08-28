import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const createRandomUserName = () => {
  return `conhulio-${Math.random()}`;
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      if (user.email == null) {
        return false;
      }

      const prismaClient = new PrismaClient();

      let hasExistingUser = false;

      try {
        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email },
        });

        hasExistingUser = existingUser != null;
      } catch (error) {
        console.error(error);
      }

      if (hasExistingUser) {
        return true;
      }

      const response = await prismaClient.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: createRandomUserName(),
        },
      });

      return response.email === user.email;
    },
    async session({ session }) {
      if (session.user == null) {
        return session;
      }

      const prismaClient = new PrismaClient();
      const existingUser = await prismaClient.user.findUnique({
        where: { email: session.user.email },
      });

      if (existingUser?.username == null) {
        return session;
      }

      session.user.username = existingUser?.username;

      return session;
    },
  },
});
