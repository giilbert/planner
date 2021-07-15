import styles from '@css/Event.module.css';

export default function Event() {
  return (
    <div className={styles.container}>
      <h1>This is an event</h1>
      <hr />
      <p>Asdasd</p>

      <p className={styles.dateTime}>12/2/31 12:20PM</p>
    </div>
  );
}
