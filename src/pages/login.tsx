import { Form, Formik, Field, ErrorMessage } from 'formik';
import { getSession, signIn } from 'next-auth/react';
import * as Yup from 'yup';
import styles from '@css/registerAndLogin.module.css';
import Spinner from '@components/Spinner';
import { useState } from 'react';
import { GetServerSideProps } from 'next';

const schema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  email: Yup.string().required('Email is requied'),
});

function RegisterPage() {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  return (
    <div className={styles.pageContainer}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          setSubmitting(true);

          await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
          })
            .then((a) => {
              // @ts-ignore
              const result: {
                ok: boolean;
                status: number;
              } = a;

              if (result.ok) window.location.href = '/app';
              else if (result.status === 401)
                setFormError('Invalid email or password');
              else if (result.status !== 401) setFormError('An error occured');
            })
            .catch(console.error);

          setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <h1>Login</h1>

          <div className={styles.fieldContainer}>
            <p>Email</p>
            <Field name="email" type="text" placeholder="you@acme.com" />
            <span className={styles.errorMessage}>
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className={styles.fieldContainer}>
            <p>Password</p>
            <Field name="password" type="password" />
            <span className={styles.errorMessage}>
              <ErrorMessage name="password" />
            </span>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {!submitting ? 'Submit' : <Spinner width="25px" height="25px" />}
          </button>

          <span className={styles.errorMessage}>{formError}</span>
        </Form>
      </Formik>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (session)
    return {
      props: {},
      redirect: {
        destination: '/app',
      },
    };

  return {
    props: {},
  };
};

export default RegisterPage;
