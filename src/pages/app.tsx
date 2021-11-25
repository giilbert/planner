import { useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

import Spinner from '@components/Spinner';
import EventsView from '@components/EventsView';
import Navbar from '@components/Navbar';
import Calendar from '@components/Calendar';

import styles from '@css/app.module.css';

let session: Session;
export default function AppPage() {
  const [error, setError] = useState('');
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
          <title>some name idk</title>
        </Head>
        <Navbar />
        <div className={styles.mainContent}>
          <EventsView />
          <Calendar />
        </div>
      </>
    );
}
