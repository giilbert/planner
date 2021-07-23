import IEvent from '@utils/types/event';

import styles from '@css/Event.module.css';

export default function Event(props: IEvent) {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <hr />
      <p>{props.description}</p>

      <p className={styles.dateTime}>
        {new Date(props.dateTime).toLocaleString('en-us', {
          dateStyle: 'full',
        })}
      </p>
    </div>
  );
}
