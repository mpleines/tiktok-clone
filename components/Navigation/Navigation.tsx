import { FunctionComponent, ReactNode } from 'react';
import MaxWidth from '../MaxWidth/MaxWidth';
import styles from './Navigation.module.css';

interface NavigationProps {}

const Navigation: FunctionComponent<NavigationProps> = () => {
  return (
    <nav className={styles.wrapper}>
      <MaxWidth>
        <div className={styles.inner}>
          <div>
            <h1 className={styles.title}>Tik Tok</h1>
          </div>
          <div>
            <button>Hochladen</button>
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default Navigation;
