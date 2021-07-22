import { useEffect, createRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebase from 'firebase';

import styles from '@css/CreateEvent.module.css';
import commons from '@css/commons.module.css';

interface Props {
  close: () => void;
}

export default function CreateEvent({ close }: Props) {
  const [error, setError] = useState('');
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
            // post to server
            const res = await fetch('/api/createEvent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await firebase
                  .auth()
                  .currentUser?.getIdToken()}`,
              },
              body: JSON.stringify(values),
            });

            const json = await res.json();

            if (json.error) {
              setError(json.error);
            } else {
              close();
            }
          }}
          validate={(values) => {
            const errors: {
              [key: string]: string;
            } = {};
            if (values.title.trim() === '') {
              errors.title = 'Title cannot be empty';
            }

            return errors;
          }}
        >
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <p>TITLE</p>
              <Field name="title" type="text" />
              <span className={styles.errorMessage}>
                <ErrorMessage name="title" />
              </span>
            </div>

            <div className={styles.inputContainer}>
              <p>
                DESCRIPTION <span>(OPTIONAL)</span>
              </p>
              <Field name="description" type="text" />
              <span className={styles.errorMessage}>
                <ErrorMessage name="description" />
              </span>
            </div>

            <p className={styles.errorMessage}>{error}</p>

            <button
              type="submit"
              className={`${commons.button} ${styles.submit}`}
            >
              Create Event
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
