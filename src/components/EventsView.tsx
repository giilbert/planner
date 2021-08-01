import { useEffect } from 'react';
import useSWR from 'swr';
import { events } from '@components/CreateEvent';
import styles from '@css/EventsView.module.css';

import Event from './Event';
import withAuth from '@utils/authFetcher';
import IEvent from '@utils/types/event';

export default function EventsView() {
  const { data, error, revalidate } = useSWR<IEvent[]>(
    ['/api/getEvent'],
    withAuth
  );

  useEffect(() => {
    events.on('change', revalidate);

    return () => {
      events.off('change', revalidate);
    };
  }, [revalidate]);

  if (error) return <p>an error occured.</p>;
  if (!data) return <p>loading...</p>;

  const todayEvents = filterToday(data);
  const tommorowEvents = filterTommorow(data);

  return (
    <div className={styles.container}>
      <p className={styles.label}>TODAY</p>
      {todayEvents.map((v, i) => {
        return <Event {...v} key={i + ' today'} />;
      })}

      <p className={styles.label}>TOMMOROW</p>
      {tommorowEvents.map((v, i) => (
        <Event {...v} key={i + ' tommorow'} />
      ))}

      <p className={styles.label}>ALL</p>
      {data.map((v, i) => (
        <Event {...v} key={i + ' all'} />
      ))}
    </div>
  );
}

function filterToday(data: IEvent[]) {
  const today = new Date();
  return data.filter((v) => new Date(v.dateTime).getDate() === today.getDate());
}

function filterTommorow(data: IEvent[]) {
  const today = new Date();
  return data.filter(
    (v) => new Date(v.dateTime).getDate() === today.getDate() + 1
  );
}
