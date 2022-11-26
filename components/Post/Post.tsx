import Link from 'next/link';
import { FunctionComponent } from 'react';
import Button from '../Button/Button';
import Video from '../Video/Video';
import styles from './Post.module.css';

interface PostProps {
  description: string;
  videoUrl: string;
  author?: string;
  tags?: string[];
}

const TEST_VIDEO_URL =
  'https://f004.backblazeb2.com/file/fikfok/test_video.mp4';

const Post: FunctionComponent<PostProps> = ({
  description,
  author,
  videoUrl,
  tags,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.author}>
          <Link href="">
            <a className={styles.link}>{author}</a>
          </Link>
        </h3>
        <Button onClick={() => null} title="Folgen" />
      </div>
      <div className={styles.description}>{description}</div>
      <Video src={TEST_VIDEO_URL} />
    </div>
  );
};

export default Post;
