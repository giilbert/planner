import { useEffect, createRef, useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikProps,
} from 'formik';
import firebase from 'firebase';
import { EventEmitter } from 'events';

import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';

import styles from '@css/CreateEvent.module.css';
import commons from '@css/commons.module.css';
import { toTimestamp, validateDate } from '@utils/dateUtils';

const events = new EventEmitter();

interface Props {
  close: () => void;
}

const today = new Date();
export default function CreateEvent({ close }: Props) {
  const [error, setError] = useState('');
  const mainRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      if (!mainRef.current) return;
      mainRef.current.style.transform = 'scale(1)';
    }, 100);
  }, [mainRef]);

  const formSubmit = async (values: any) => {
    // post to server
    if (!window.navigator.onLine) {
      setError('No internet connection detected.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const res = await fetch('/api/createEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await firebase
          .auth()
          .currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({
        ...values,
        dateTime: toTimestamp(values.date, values.time),
      }),
    });

    if (!res.ok) {
      setError('An error occured.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    let json;
    try {
      json = await res.json();
    } catch {}

    if (json?.error) {
      setError(json.error);
    }

    events.emit('change');
    close();
  };

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
          initialValues={{
            title: '',
            description: '',
            date: {
              month: today.getMonth(),
              date: today.getDate(),
              year: today.getFullYear(),
            },
            time: {
              hour: today.getHours() % 12,
              minutes: today.getMinutes(),
              pm: today.getHours() > 12,
            },
          }}
          onSubmit={formSubmit}
          validate={(values) => {
            const errors: {
              [key: string]: string;
            } = {};
            if (values.title.trim() === '') {
              errors.title = 'Title cannot be empty';
            }

            if (!validateDate(values.date)) {
              errors.date = 'Invalid date';
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

            {/* descriptio input */}
            <div className={styles.inputContainer}>
              <p>
                DESCRIPTION <span>(OPTIONAL)</span>
              </p>
              <Field name="description">
                {({ form }: FieldProps) => <TextareaInput {...form} />}
              </Field>
              <span className={styles.errorMessage}>
                <ErrorMessage name="description" />
              </span>
            </div>

            <div className={styles.inputContainer}>
              <p>DATE</p>
              <Field name="date">
                {({ form }: FieldProps) => (
                  <div>
                    <DateSelector {...form} />
                  </div>
                )}
              </Field>
              <span className={styles.errorMessage}>
                <ErrorMessage name="date" />
              </span>
            </div>

            <div className={styles.inputContainer}>
              <p>TIME</p>
              <Field name="time">
                {({ form }: FieldProps) => (
                  <div>
                    <TimeSelector {...form} />
                  </div>
                )}
              </Field>
              <span className={styles.errorMessage}>
                <ErrorMessage name="time" />
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

const maxLength = 300;
// throttle setLength()
let setLengthTimeout: NodeJS.Timeout;
function TextareaInput(form: FormikProps<any>) {
  const [length, setLength] = useState(0);
  return (
    <>
      <textarea
        value={form.values['description']}
        className={styles.input}
        onChange={(e) => {
          const value = e.target.value;

          if (value.length <= maxLength)
            form.setFieldValue('description', value);

          clearTimeout(setLengthTimeout);
          setLengthTimeout = setTimeout(() => {
            setLength(value.length <= maxLength ? value.length : maxLength);
          }, 200);
        }}
      />
      <p>
        {length} / {maxLength} <br />
        {length >= maxLength && 'You reached to max description length'}
      </p>
    </>
  );
}

export { events };
