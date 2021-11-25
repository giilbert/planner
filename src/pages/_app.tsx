import '../styles/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider refetchInterval={10 * 60} session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
