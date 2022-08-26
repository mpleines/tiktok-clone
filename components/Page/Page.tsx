import { useSession } from 'next-auth/react';
import { FunctionComponent, ReactNode } from 'react';
import styles from './Page.module.css';
import MaxWidth from '../MaxWidth/MaxWidth';

interface PageProps {
  children?: ReactNode;
  sessionRequired?: boolean;
}

const Page: FunctionComponent<PageProps> = ({ children, sessionRequired }) => {
  const { data: session } = useSession();

  return (
    <main className={styles.wrapper}>
      {!session && sessionRequired ? (
        <span>You are not logged in</span>
      ) : (
        <div className={styles.layout}>
          <MaxWidth>{children}</MaxWidth>
        </div>
      )}
    </main>
  );
};

export default Page;
