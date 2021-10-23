import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { events } from '@components/CreateEvent';
import Dropdown from '@components/Dropdown';

import Event from './Event';
import withAuth from '@utils/authFetcher';
import IEvent from '@utils/types/event';

import styles from '@css/EventsView.module.css';

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
      <EventGroup name={'TODAY'} data={todayEvents} />
      <EventGroup name={'TOMMOROW'} data={tommorowEvents} />
      <EventGroup name={'ALL'} data={data} />
    </div>
  );
}

interface EventGroupProps {
  name: string;
  data: IEvent[];
}

function EventGroup({ name, data }: EventGroupProps) {
  return (
    <Dropdown
      content={data.map((event, i) => (
        <Event {...event} key={i} />
      ))}
      label={<p>{name}</p>}
    />
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
