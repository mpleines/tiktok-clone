import { FunctionComponent, ReactNode } from 'react';
import Button from '../Button/Button';
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
            <Button title="Hochladen" onClick={() => null} />
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default Navigation;
