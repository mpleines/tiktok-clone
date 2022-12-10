import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postid } = req.query;

  if (req.method === 'DELETE') {
    const response = await prisma.post.delete({ where: { id: Number(postid) } })
    return res.status(200).send(response);
  }
}
