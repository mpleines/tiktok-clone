import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import Post from '../components/Post/Post';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import { Post as PostType } from '@prisma/client';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR<PostType[]>('/api/posts', fetcher);

  if (error) return <span>Error</span>;

  return (
    <div className={styles.container}>
      <Page sessionRequired>
        {!data && <span>Loading...</span>}
        {data?.map((post) => (
          <Post
            key={post.id}
            author={post.authorName ?? ''}
            description={post.description}
            videoUrl={post.videoUrl}
          />
        ))}
      </Page>
    </div>
  );
};

export default Home;
