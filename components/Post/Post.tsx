import { FunctionComponent } from 'react';
import styles from './Post.module.css';

interface PostProps {}

const Post: FunctionComponent<PostProps> = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>
          <h2>Maik Pleines</h2>
          <div>
            <button className={styles.follow}>Folgen</button>
          </div>
        </div>
        <div className={styles.tags}>
          <strong>#cool</strong>
          <strong>#cool</strong>
          <strong>#cool</strong>
          <strong>#cool</strong>
          <strong>#cool</strong>
          <strong>#cool</strong>
          <strong>#cool</strong>
        </div>
        <div className={styles.videoWrapper}>
          <video
            muted={true}
            autoPlay={true}
            loop={true}
            className={styles.video}
            src="https://v16-webapp.tiktok.com/5055612daac6478aa349eb944398c3e0/62f8658c/video/tos/alisg/tos-alisg-pve-0037c001/71902a16413f4cbb9f2730806c8b4a7d/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=4584&bt=2292&cs=0&ds=3&ft=eXd.6HJ9Myq8Z6sKAwe2NJaeyl7Gb&mime_type=video_mp4&qs=0&rc=PDM0OzM7Omc8PGU2aGZoO0BpM2Z0aTo6ZnU8ZTMzODczNEA1NDQwMjYtNmAxNTUwYmMwYSNsaWRgcjRfcmVgLS1kMS1zcw%3D%3D&l=202208132101040102170191440A8CD48F&btag=80000"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
