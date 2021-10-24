import IEvent from '@utils/types/event';

import styles from '@css/Event.module.css';

export default function Event(props: IEvent) {
  const date = new Date(props.dateTime);
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <hr />
      <div>
        {props.description.split('\n').map((v, key) => {
          // line breaks
          if (v === '') return <br key={key} />;
          return <span key={key}>{v}</span>;
        })}
      </div>

      <p className={styles.dateTime}>
        {date.toLocaleString('en-us', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}

        <br />

        {date.toLocaleString('en-us', {
          hour: 'numeric',
          hour12: true,
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}
