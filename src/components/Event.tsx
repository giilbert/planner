import IEvent from '@utils/types/event';

import styles from '@css/Event.module.css';

export default function Event(props: IEvent) {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <hr />
      <div>
        {props.description.split('\n').map((i, key) => {
          return <div key={key}>{i}</div>;
        })}
      </div>

      <p className={styles.dateTime}>
        {new Date(props.dateTime).toLocaleString('en-us', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}

        <br />

        {new Date(props.dateTime).toLocaleString('en-us', {
          hour: 'numeric',
          hour12: true,
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}
