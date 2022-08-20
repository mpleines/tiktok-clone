import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import MaxWidth from '../MaxWidth/MaxWidth';
import styles from './Navigation.module.css';

interface NavigationProps {}

const Navigation: FunctionComponent<NavigationProps> = () => {
  return (
    <nav className={styles.wrapper}>
      <MaxWidth>
        <div className={styles.flex}>
          <div>
            <h1 className={styles.title}>Tik Tok</h1>
          </div>
          <div className={styles.actions}>
            <Button title="Hochladen" onClick={() => null} />
            <Link href="/settings">
              <a className={styles.avatarLink}>
                <Avatar />
              </a>
            </Link>
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default Navigation;
