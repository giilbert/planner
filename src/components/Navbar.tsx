/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { createPortal } from 'react-dom';
import firebase from 'firebase';
import CreateEvent from './CreateEvent';

import styles from '@css/Navbar.module.css';
import commons from '@css/commons.module.css';

export default function Navbar() {
  const [eventCreatorActive, setActive] = useState(false);

  return (
    <div className={styles.container}>
      {eventCreatorActive &&
        createPortal(
          <CreateEvent close={() => setActive(false)} />,
          document.body
        )}

      <button
        onClick={() => setActive(true)}
        className={`${commons.button} ${commons.buttonSmall} ${styles.createEventButton}`}
      >
        {/* plus icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fff"
          width="1.5rem"
          height="1.5rem"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create Event
      </button>

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
        <p
          onClick={() => {
            firebase.auth().signOut();
          }}
          className={commons.textButton}
        >
          Sign out
        </p>
      </div>
    </div>
  );
}
