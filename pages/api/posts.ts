import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({ orderBy: [ {createdAt: 'desc'} ]});
    return res.status(200).send(posts);
  }
}
