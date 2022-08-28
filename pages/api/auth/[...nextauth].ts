import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const userNameChars = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const userNameNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const createRandomUserName = () => {
  return `${Array.from(Array(6).keys())
    .map(() => userNameChars[Math.floor(Math.random() * userNameChars.length)])
    .join('')}${Array.from(Array(4).keys())
    .map(
      () => userNameNumbers[Math.floor(Math.random() * userNameNumbers.length)]
    )
    .join('')}`;
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
