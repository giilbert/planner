import { useEffect, useState } from 'react';
import { FormikProps } from 'formik';

import { convertMonthStringToNumber } from '@utils/dateUtils';

import styles from '@css/DateSelector.module.css';

const today = new Date();
function DateSelector({ setFieldValue }: FormikProps<any>) {
  const [currentDate, setCurrentDate] = useState({
    month: today.getMonth(),
    date: today.getDate(),
    year: today.getFullYear(),
  });

  useEffect(() => {
    setFieldValue('date', currentDate);
  }, [currentDate, setFieldValue]);

  return (
    <div>
      <div className={styles.classicInput}>
        <select
          className={styles.select}
          defaultValue={today.toLocaleDateString('en-us', { month: 'long' })}
          onChange={(e) => {
            const month = convertMonthStringToNumber(e.target.value);
            setCurrentDate({
              ...currentDate,
              month,
            });
          }}
        >
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>

        <p>/</p>

        <input
          type="number"
          className={styles.date}
          autoComplete="off"
          placeholder="Date"
          defaultValue={today.getDate()}
          onChange={(e) => {
            setCurrentDate({
              ...currentDate,
              date: parseInt(e.target.value),
            });
          }}
        />

        <p>/</p>

        <input
          type="number"
          className={styles.year}
          autoComplete="off"
          placeholder="Year"
          defaultValue={today.getFullYear()}
          onChange={(e) => {
            setCurrentDate({
              ...currentDate,
              year: parseInt(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}

export default DateSelector;
