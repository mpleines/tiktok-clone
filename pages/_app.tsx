import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';
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
        <Sidebar />
        <Component {...pageProps} />
      </MaxWidth>
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </SessionProvider>
  );
}

export default MyApp;
