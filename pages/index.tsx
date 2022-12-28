import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import Post from '../components/Post/Post';
import useSWR from 'swr';
import { Post as PostType } from '@prisma/client';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import { fetcher } from '../services/ApiService';

const Home: NextPage = () => {
  const { data, error } = useSWR<PostType[]>("/api/posts", fetcher);

  if (error) return <span>Error</span>;

  return (
    <RouteGuard>
      <Page>
        {!data && <span>Loading...</span>}
        {data?.map((post) => (
          <Post
            key={post.id}
            author={post.authorName ?? ""}
            description={post.description}
            videoUrl={post.videoUrl}
          />
        ))}
      </Page>
    </RouteGuard>
  );
};

export default Home;
