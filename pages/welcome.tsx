import { FunctionComponent } from 'react';
import Page from '../components/Page/Page';
import styles from './welcome.module.css';

interface WelcomeProps {}

const Welcome: FunctionComponent<WelcomeProps> = () => {
  return (
    <Page>
      <div className={styles.layout}>
        <h1>Welcome to ShigTok</h1>
        <div className={styles.info}>
          <p>ShigTok is a place to share and watch videos.</p>
          <p>You can join us by using your Google Account to login.</p>
        </div>
      </div>
    </Page>
  );
};

export default Welcome;
