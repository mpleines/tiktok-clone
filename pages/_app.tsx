import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from '../styles/Home.module.css';
import MaxWidth from '../components/MaxWidth/MaxWidth';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navigation />
      <MaxWidth>
        <div className={styles.layout}>
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </MaxWidth>

      <footer className={styles.footer}></footer>
    </SessionProvider>
  );
}

export default MyApp;
