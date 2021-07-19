import { useEffect, createRef } from 'react';

import styles from '@css/CreateEvent.module.css';

interface Props {
  close: () => void;
}

export default function CreateEvent({ close }: Props) {
  const mainRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      if (!mainRef.current) return;
      mainRef.current.style.transform = 'scale(1)';
    }, 100);
  }, [mainRef]);

  return (
    <div
      className={styles.background}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className={styles.main}
        style={{
          transform: 'scale(0)',
        }}
        ref={mainRef}
      >
        <div onClick={close} className={styles.nevermind}>
          Nevermind
        </div>
      </div>
    </div>
  );
}
