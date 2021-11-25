/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CreateEvent from './CreateEvent';

import styles from '@css/Navbar.module.css';
import commons from '@css/commons.module.css';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const [eventCreatorActive, setActive] = useState(false);
  const session = useSession({
    required: true,
  });

  useEffect(() => {
    document.body.style.overflow = eventCreatorActive ? 'hidden' : 'auto';
  }, [eventCreatorActive]);

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

      {/* user profile and authentication button */}
      <div className={styles.right}>
        <p className={styles.nameText}>
          Signed in as {session.data?.user?.name}
        </p>
        <p
          onClick={() => {
            signOut({
              callbackUrl: '/',
            });
          }}
          className={commons.textButton}
        >
          Sign out
        </p>
      </div>
    </div>
  );
}
