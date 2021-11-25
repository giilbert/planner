// the calendar in the main page used to display events
import styles from '@css/Calendar.module.css';
import useSWR from 'swr';
import Event from '@utils/types/event';
import { numberOfDays } from '@utils/dateUtils';

export default function Calendar() {
  const today = new Date();

  const { data, error } = useSWR<Event[]>([
    `/api/getEvent?month=${today.getMonth()}&year=${today.getFullYear()}`,
  ]);

  if (error) return <p>an error occurred loading calendar data</p>;
  if (!data) return <p>loading</p>;

  // turn the date string in data into a Date object
  data.forEach((v) => {
    v.date = new Date(v.date);
  });

  // a map containing events, where the data maps to the events
  const events = new Map<number, Event[]>();

  // turn array data into a map
  data.forEach((v) => {
    if (!events.get(v.date.getDate())) events.set(v.date.getDate(), []);
    const current = events.get(v.date.getDate()) as Event[];

    events.set(v.date.getDate(), current.concat(v));
  });

  // offset from the first calendar cell to the first day, empty cells
  // const offset = 6;
  const offset = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  return (
    <div className={styles.scrollContainer}>
      <div
        className={styles.calendar}
        style={{
          gridTemplateRows: offset === 6 ? 'repeat(6, 1fr)' : 'repeat(5, 1fr)',
        }}
      >
        {Array(offset)
          .fill(0)
          .map((_, i) => (
            <p key={i + ' empty'}></p>
          ))}

        {Array(numberOfDays[today.getMonth()])
          .fill(0)
          .map((_, i) => {
            return (
              <div key={i} className={styles.calendarCell}>
                {/* +1, arrays start at 0 */}
                <p>{i + 1}</p>

                {events
                  .get(i + 1)
                  ?.slice(0, 3)
                  .map((v, i) => (
                    <p key={i} className={styles.eventTag}>
                      {v.title}
                    </p>
                  ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}
