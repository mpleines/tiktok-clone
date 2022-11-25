import { useSession } from 'next-auth/react';
import { FunctionComponent, ReactNode } from 'react';
import styles from './Page.module.css';
import MaxWidth from '../MaxWidth/MaxWidth';
import useMediaQuery from '../../hooks/useMediaQuery';

interface PageProps {
  children?: ReactNode;
  sessionRequired?: boolean;
}

const Page: FunctionComponent<PageProps> = ({ children, sessionRequired }) => {
  const { status } = useSession();
  const isSmallScreen = useMediaQuery('(max-width: 700px)');

  return (
    <main className={isSmallScreen ? styles.smallWrapper : styles.wrapper}>
      {status === 'loading' ? null : status === 'unauthenticated' &&
        sessionRequired ? (
        <div className={styles.layout}>
          <h1>Welcome to ShigTok</h1>
          <div className={styles.info}>
            <p>ShigTok is a place to share and watch videos.</p>
            <p>You can join us by using your Google Account to login</p>
          </div>
        </div>
      ) : (
        <div className={styles.layout}>
          <MaxWidth>{children}</MaxWidth>
        </div>
      )}
    </main>
  );
};

export default Page;
