/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import firebase from 'firebase';
import styles from '@css/Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.container}>
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
