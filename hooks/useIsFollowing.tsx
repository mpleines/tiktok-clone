import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

// TODO: update types of user
export const useIsFollowing = (followingUserId: number): boolean => {
  const currentUser = useSession().data?.user;
  const followers: User[] = currentUser?.following;

  return followers?.some(({ id }) => id === followingUserId);
};
