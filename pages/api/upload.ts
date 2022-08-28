import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = req.body;

  try {
    const response = await prisma.post.create({ data: post });

    res.status(200).send({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
