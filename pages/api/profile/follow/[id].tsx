import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../db/prisma';

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
    include: { followedBy: true, following: true },
  });

  if (follower == null || user == null) {
    return res.status(404);
  }

  let updatedUser;

  // if the user is already following, we are going to unfollow
  if (user.following.some(({ id }) => id === Number(followerId))) {
    // update the current user
    updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        following: {
          disconnect: [{ id: follower.id }],
        },
      },
      include: { followedBy: true, following: true },
    });

    // update the followed user
    await prisma.user.update({
      where: { id: follower.id },
      data: {
        followedBy: {
          disconnect: [{ id: user.id }],
        },
      },
      include: { followedBy: true, following: true },
    });
  } else {
    // update the current user
    updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        following: {
          connect: [{ id: follower.id }],
        },
      },
      include: { followedBy: true, following: true },
    });

    // update the followed user
    await prisma.user.update({
      where: { id: follower.id },
      data: {
        followedBy: {
          connect: [{ id: user.id }],
        },
      },
      include: { followedBy: true, following: true },
    });
  }

  return res.status(200).send(updatedUser);
}
