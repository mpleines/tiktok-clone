import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: followerId } = req.query;
  const session = await getSession({ req });

  if (followerId == null) {
    return res.status(500);
  }

  const follower = await prisma.user.findUnique({
    where: { id: Number(followerId) },
  });

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  if (follower == null || user == null) {
    return res.status(404);
  }

  // update the current user
  await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      following: {
        connectOrCreate: { where: { id: session?.user.id }, create: follower },
      },
    },
  });

  // Update the followed user
  await prisma.user.update({
    where: {
      id: Number(followerId),
    },
    data: {
      followedBy: {
        connectOrCreate: { where: { id: session?.user.id }, create: user },
      },
    },
  });

  return res.status(200);
}
