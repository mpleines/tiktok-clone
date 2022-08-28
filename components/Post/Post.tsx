import { FunctionComponent } from 'react';
import Button from '../Button/Button';
import styles from './Post.module.css';

interface PostProps {
  description: string;
  author: string;
  videoUrl: string;
}

const Post: FunctionComponent<PostProps> = ({
  description,
  author,
  videoUrl,
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>
          <h2>{author}</h2>
          <div>
            <Button title="Folgen" onClick={() => null} />
          </div>
        </div>
        <div className={styles.tags}>{description}</div>
        <div className={styles.videoWrapper}>
          <video
            muted={true}
            autoPlay={true}
            loop={true}
            className={styles.video}
            src={videoUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
