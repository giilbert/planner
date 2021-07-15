import styles from '@css/EventsView.module.css';

import Event from './Event';

export default function EventsView() {
  return (
    <div className={styles.container}>
      <Event />
    </div>
  );
}
