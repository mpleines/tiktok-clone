import { FunctionComponent } from 'react';
import styles from './AlphaVersionBanner.module.css';

interface AlphaVersionBannerProps {}

const AlphaVersionBanner: FunctionComponent<AlphaVersionBannerProps> = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.text}>0.1 Alpha Version</h1>
    </div>
  );
};

export default AlphaVersionBanner;
