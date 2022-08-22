import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import Post from '../components/Post/Post';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Page sessionRequired>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Page>
    </div>
  );
};

export default Home;
