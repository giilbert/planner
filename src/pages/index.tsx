import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '@css/index.module.css';

function IndexPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tempus</title>
      </Head>

      <Image
        src="/tempus_logo.svg"
        alt="Tempus Logo"
        width="500"
        height="200"
      />

      <main>
        <p>An easy way to plan your time.</p>
        <Link href="/app" passHref>
          <span className={styles.openAppButton}>Go to the app</span>
        </Link>
      </main>
    </div>
  );
}

export default IndexPage;
