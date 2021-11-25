// the loading icons

import Image from 'next/image';
import styles from '@css/Spinner.module.css';

import SpinnerIcon from '../../public/loading.svg';

export default function Spinner({
  width = '50px',
  height = '50px',
}: {
  width?: string;
  height?: string;
}) {
  return (
    <Image
      src={SpinnerIcon}
      alt="Loading..."
      width={width}
      height={height}
      className={styles.spinner}
    />
  );
}
