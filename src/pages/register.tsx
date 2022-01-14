import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '@css/registerAndLogin.module.css';
import Spinner from '@components/Spinner';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters long')
    .max(20, 'Username can not be longer than 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match'
  ),
  email: Yup.string().email('Email must be valid').required('Email is requied'),
});

function RegisterPage() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Tempus | Register</title>
      </Head>
      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={schema}
        onSubmit={async (values, { setErrors }) => {
          setSubmitting(true);

          const res = await fetch('/api/auth/register', {
            body: JSON.stringify(values),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          try {
            const errors = await res.json();
            if (errors) setErrors(errors);
          } catch {
            window.location.href = '/login';
          }

          setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <h1>Register</h1>

          <div className={styles.fieldContainer}>
            <p>Email</p>
            <Field name="email" type="text" placeholder="you@acme.com" />
            <span className={styles.errorMessage}>
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className={styles.fieldContainer}>
            <p>Name</p>
            <Field name="name" type="text" placeholder="John Doe" />
            <span className={styles.errorMessage}>
              <ErrorMessage name="name" />
            </span>
          </div>

          <div className={styles.fieldContainer}>
            <p>Username</p>
            <Field name="username" type="text" placeholder="john_doe" />
            <span className={styles.errorMessage}>
              <ErrorMessage name="username" />
            </span>
          </div>

          <div className={styles.fieldContainer}>
            <p>Password</p>
            <Field name="password" type="password" />
            <span className={styles.errorMessage}>
              <ErrorMessage name="password" />
            </span>
          </div>

          <div className={styles.fieldContainer}>
            <p>Confirm Password</p>
            <Field name="confirmPassword" type="password" />
            <span className={styles.errorMessage}>
              <ErrorMessage name="confirmPassword" />
            </span>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {!submitting ? 'Submit' : <Spinner width="25px" height="25px" />}
          </button>

          <Link href="/login">
            <a
              style={{
                color: 'cornflowerblue',
                textDecoration: 'none',
                marginTop: '10px',
              }}
            >
              I already have an account
            </a>
          </Link>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterPage;
