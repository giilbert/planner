import { useEffect, createRef } from 'react';
import { Formik, Form, Field } from 'formik';

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
          Close
        </div>

        <Formik
          initialValues={{ title: '', description: '' }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <p>TITLE</p>
              <Field name="title" type="text" />
            </div>

            <div className={styles.inputContainer}>
              <p>DESCRIPTION</p>
              <Field name="description" type="text" />
            </div>

            <button type="submit" className={styles.submit}>
              Create Event
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
