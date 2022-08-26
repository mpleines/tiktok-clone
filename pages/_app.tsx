import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from '../styles/Home.module.css';
import MaxWidth from '../components/MaxWidth/MaxWidth';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import Login from '../components/Login/Login';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <SessionProvider session={session}>
      <Navigation openLoginModal={() => setShowLoginModal(true)} />
      <MaxWidth>
        <div className={styles.layout}>
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </MaxWidth>

      <footer className={styles.footer}></footer>

      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </SessionProvider>
  );
}

export default MyApp;
