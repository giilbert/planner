import Image from 'next/image';
import styles from '@css/Spinner.module.css';

import SpinnerIcon from '../../public/loading.svg';

export default function Spinner() {
  return (
    <Image
      src={SpinnerIcon}
      alt="Loading..."
      width="50px"
      height="50px"
      className={styles.spinner}
    />
  );
}
