import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import Post from '../components/Post/Post';
import useSWR from 'swr';
import { Post as PostType, User } from '@prisma/client';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import { fetcher } from '../services/ApiService';
import { reloadSession } from '../helpers/reloadSession';

const Home: NextPage = () => {
  const { data: posts, error: postsError } = useSWR<PostType[]>(
    '/api/posts',
    fetcher
  );
  const { data: users, error: usersError, mutate } = useSWR<User[]>(
    '/api/profile',
    fetcher
  );

  const follow = async (userId: number) => {
    await fetch(`/api/profile/follow/${userId}`);
    reloadSession();
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
            avatarUrl={
              users?.find((user) => user.id === post.authorId)?.avatar!
            }
            onFollow={(userId) => follow(userId)}
          />
        ))}
      </Page>
    </RouteGuard>
  );
};

export default Home;
