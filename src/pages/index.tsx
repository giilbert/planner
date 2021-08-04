import { useEffect, useState } from 'react';
import Head from 'next/head';
import firebase from 'firebase';
import GoogleButton from 'react-google-button';

import Spinner from '@components/Spinner';
import EventsView from '@components/EventsView';
import Navbar from '@components/Navbar';
import Calendar from '@components/Calendar';

import styles from '@css/index.module.css';

if (firebase.apps.length === 0)
  firebase.initializeApp({
    apiKey: 'AIzaSyArrNuyLAYgwH-RG8LEEq8BmijS_F_b7PM',
    authDomain: 'planner-gil.firebaseapp.com',
    projectId: 'planner-gil',
    storageBucket: 'planner-gil.appspot.com',
    messagingSenderId: '609580660489',
    appId: '1:609580660489:web:acb2b270b4bd94486b85d8',
  });

const provider = new firebase.auth.GoogleAuthProvider();

export default function IndexPage() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((e) => {
      setSignedIn(e ? true : false);
    });
  }, []);

  if (signedIn === null)
    return (
      <div className={styles.center}>
        <Spinner />
        <p>Logging you in..</p>
      </div>
    );

  if (signedIn)
    return (
      <>
        <Head>
          <title>some name idk</title>
        </Head>
        <Navbar />
        <div className={styles.mainContent}>
          <EventsView />
          <Calendar />
        </div>
      </>
    );

  // not authenticated page
  return (
    <div className={styles.center}>
      <Head>
        <title>some name idk - Login</title>
      </Head>

      <h1>Planner</h1>
      <p>A simple way to organize your day</p>

      <GoogleButton
        type="light"
        onClick={async () => {
          try {
            await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

            const isSafari =
              navigator.vendor &&
              navigator.vendor.indexOf('Apple') > -1 &&
              navigator.userAgent &&
              navigator.userAgent.indexOf('CriOS') == -1 &&
              navigator.userAgent.indexOf('FxiOS') == -1;

            if (!isSafari) {
              // chrome
              await firebase.auth().signInWithPopup(provider);
            } else {
              // safari
              await firebase.auth().signInWithRedirect(provider);
            }

            // safari does not like popups
          } catch (e) {
            console.error(e);
            setError('An error occured.');
          }
        }}
      />

      <p className={styles.error}>{error}</p>
    </div>
  );
}
