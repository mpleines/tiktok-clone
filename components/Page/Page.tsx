import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FunctionComponent, ReactNode } from 'react';
import Button from '../Button/Button';
import styles from './Page.module.css';
import { signIn } from 'next-auth/react';

interface PageProps {
  children?: ReactNode;
  sessionRequired?: boolean;
}

const Page: FunctionComponent<PageProps> = ({ children, sessionRequired }) => {
  const { data: session } = useSession();
  return (
    <main className={styles.wrapper}>
      {!session && sessionRequired ? (
        <div className={styles.notLoggedIn}>
          <span>You are not logged in.</span>
          <Button title="Sign In With Google" onClick={signIn} />
        </div>
      ) : (
        children
      )}
    </main>
  );
};

export default Page;
