import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import Post from '../components/Post/Post';
import useSWR from 'swr';
import { Post as PostType, User } from "@prisma/client";
import RouteGuard from "../components/RouteGuard/RouteGuard";
import { fetcher } from "../services/ApiService";
import { useSession } from "next-auth/react";
import { prisma } from '../db/prisma';

const Home: NextPage = () => {
  const session = useSession();
  const sessionUser = session?.data?.user;

  const { data: posts, error: postsError } = useSWR<PostType[]>(
    "/api/posts",
    fetcher
  );
  const { data: users, error: usersError } = useSWR<User[]>(
    "/api/profile",
    fetcher
  );

  const user = users?.find((user) => user.id === sessionUser.id);
  const isFollowing = prisma.user.

  const follow = (userId: number) => {
    fetch(`/api/profile/follow/${userId}`);
  };

  if (postsError || usersError) return <span>Error</span>;
  return (
    <RouteGuard>
      <Page>
        {(!posts || !users) && <span>Loading...</span>}
        {posts?.map((post) => (
          <Post
            key={post.id}
            post={post}
            avatarUrl={users?.find((user) => user.id === post.authorId)?.avatar}
            isFollowing={}
            onFollow={(userId) => follow(userId)}
          />
        ))}
      </Page>
    </RouteGuard>
  );
};

export default Home;
