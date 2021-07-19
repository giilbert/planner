/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import firebase from 'firebase';
import styles from '@css/Navbar.module.css';
import CreateEvent from './CreateEvent';

export default function Navbar() {
  const [eventCreatorActive, setActive] = useState(false);

  return (
    <div className={styles.container}>
      {eventCreatorActive && <CreateEvent close={() => setActive(false)} />}
      <button onClick={() => setActive(true)}>Create Event</button>

      <div className={styles.right}>
        <div
          style={{
            backgroundImage: `url("${firebase.auth().currentUser?.photoURL}")`,
          }}
          className={styles.profilePicture}
        />
        <p className={styles.nameText}>
          {firebase.auth().currentUser?.displayName}
        </p>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
