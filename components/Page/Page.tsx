import { FunctionComponent, ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  children?: ReactNode;
}

const Page: FunctionComponent<PageProps> = ({ children }) => {
  return <main className={styles.wrapper}>{children}</main>;
};

export default Page;
