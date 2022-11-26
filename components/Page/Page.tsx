import { FunctionComponent, ReactNode } from 'react';
import styles from './Page.module.css';
import MaxWidth from '../MaxWidth/MaxWidth';
import useMediaQuery from '../../hooks/useMediaQuery';

interface PageProps {
  children?: ReactNode;
}

const Page: FunctionComponent<PageProps> = ({ children }) => {
  const isSmallScreen = useMediaQuery('(max-width: 700px)');

  return (
    <main className={isSmallScreen ? styles.smallWrapper : styles.wrapper}>
      <MaxWidth>{children}</MaxWidth>
    </main>
  );
};

export default Page;
