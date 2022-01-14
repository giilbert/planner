import Head from 'next/head';
import { useSession } from 'next-auth/react';

import Spinner from '@components/Spinner';
import EventsView from '@components/EventsView';
import Navbar from '@components/Navbar';
import Calendar from '@components/Calendar';

import styles from '@css/app.module.css';

export default function AppPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      window.location.href = '/login';
    },
  });

  if (status === 'loading')
    return (
      <div className={styles.center}>
        <Spinner />
        <p>Logging you in..</p>
      </div>
    );

  if (session)
    return (
      <>
        <Head>
          <title>Tempus</title>
        </Head>
        <Navbar />
        <div className={styles.mainContent}>
          <EventsView />
          <Calendar />
        </div>
      </>
    );
}
