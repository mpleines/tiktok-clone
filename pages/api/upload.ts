import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import B2 from 'backblaze-b2';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = req.body;

  try {
    const response = await prisma.post.create({ data: post });

    // upload video to backblaze
    // FIXME: do not push this! move to .env files
    const backblaze = new B2({
      applicationKeyId: '004896f07f8979a0000000001',
      applicationKey: 'K004hFiR+epD5TLkRGJXwUUOFBNiTDQ',
    });

    const authResponse = await backblaze.authorize();

    backblaze.uploadFile({
      
    })


    res.status(200).send({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
