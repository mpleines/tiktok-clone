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
          <Link href="" className={styles.link}>
            {author}
          </Link>
        </h3>
        <Button onClick={() => null} title="Folgen" />
      </div>
      <div className={styles.description}>{description}</div>
      <Video src={videoUrl} />
    </div>
  );
};

export default Post;
