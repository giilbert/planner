import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { events } from '@components/CreateEvent';
import Dropdown from '@components/Dropdown';

import Event from './Event';
import IEvent from '@utils/types/event';

import styles from '@css/EventsView.module.css';

export default function EventsView() {
  const { data, error, revalidate } = useSWR<IEvent[]>(['/api/getEvent']);
  // transform each jsonable date string into a Date object
  data?.forEach((v) => {
    v.date = new Date(v.date);
  });

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
      <EventGroup name={'TODAY'} data={todayEvents} isShowing={true} />
      <EventGroup name={'TOMMOROW'} data={tommorowEvents} isShowing={false} />
      <EventGroup name={'ALL'} data={data} isShowing={false} />
    </div>
  );
}

interface EventGroupProps {
  name: string;
  data: IEvent[];
  isShowing: boolean;
}

function EventGroup({ name, data, isShowing }: EventGroupProps) {
  return (
    <Dropdown
      content={data.map((event, i) => (
        <Event {...event} key={i} />
      ))}
      label={<p>{name}</p>}
      current={isShowing}
    />
  );
}

function filterToday(data: IEvent[]) {
  const today = new Date().getDate();
  return data.filter((v) => v.date.getDate() === today);
}

function filterTommorow(data: IEvent[]) {
  const tommorow = new Date().getDate() + 1;
  return data.filter((v) => v.date.getDate() === tommorow);
}
