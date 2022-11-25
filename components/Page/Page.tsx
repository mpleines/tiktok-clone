import { useSession } from 'next-auth/react';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import styles from './Page.module.css';
import MaxWidth from '../MaxWidth/MaxWidth';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useRouter } from 'next/router';

interface PageProps {
  children?: ReactNode;
  sessionRequired?: boolean;
}

const Page: FunctionComponent<PageProps> = ({ children, sessionRequired }) => {
  const { status } = useSession();
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width: 700px)');

  useEffect(() => {
    if (sessionRequired && status === 'unauthenticated') {
      router.push('/welcome');
    }
  }, [router, sessionRequired, status]);

  if (status === 'loading') {
    return null;
  }

  if (sessionRequired && status === 'unauthenticated') {
    return null;
  }

  return (
    <main className={isSmallScreen ? styles.smallWrapper : styles.wrapper}>
      <MaxWidth>{children}</MaxWidth>
    </main>
  );
};

export default Page;
