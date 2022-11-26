import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Login.module.css';
import { signIn } from 'next-auth/react';
import Button from '../Button/Button';
import { FiXCircle } from 'react-icons/fi';

interface LoginProps {
  onClose: () => void;
}

const Login: FunctionComponent<LoginProps> = ({ onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        <div className={styles.page}>
          <div className={styles.wrapper}>
            <div className={styles.closeArea}>
              <button onClick={onClose} className={styles.close}>
                <FiXCircle size={32} />
              </button>
            </div>
            <div className={styles.item}>
              <h1>Sign in to ShigTok</h1>
            </div>
            <div className={styles.item}>
              <Button
                title="Sign In with Google"
                onClick={() => signIn('google')}
              />
            </div>
          </div>
        </div>,
        document.querySelector('#portal-root')!
      )
    : null;
};

export default Login;
