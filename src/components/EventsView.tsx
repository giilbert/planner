import useSWR from 'swr';
import styles from '@css/EventsView.module.css';

import Event from './Event';
import withAuth from '@utils/authFetcher';
import IEvent from '@utils/types/event';

export default function EventsView() {
  const { data, error } = useSWR<IEvent[]>(['/api/getEvent'], withAuth);

  if (error) return <p>an error occured.</p>;
  if (!data) return <p>loading...</p>;

  return (
    <div className={styles.container}>
      {data.map((v: IEvent, i) => (
        <Event {...v} key={i} />
      ))}
    </div>
  );
}
