import { useEffect, useState } from 'react';
import { FormikProps } from 'formik';

import {
  convertMonthNumberToString,
  convertMonthStringToNumber,
  validateDate,
} from '@utils/dateUtils';

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
          value={convertMonthNumberToString(currentDate.month)}
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
          value={currentDate.date}
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
          value={currentDate.year}
          onChange={(e) => {
            setCurrentDate({
              ...currentDate,
              year: parseInt(e.target.value),
            });
          }}
        />
      </div>

      {/* calendar input */}
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHead}>
          <button
            onClick={(e) => {
              e.preventDefault();

              // months are offset by 1, 0 is jan
              if (currentDate.month === 0) {
                setCurrentDate({
                  ...currentDate,
                  month: 11,
                  year: currentDate.year - 1,
                });
                return;
              }

              setCurrentDate({
                ...currentDate,
                month: currentDate.month - 1,
              });
            }}
          >
            {'<'}
          </button>
          <p>{convertMonthNumberToString(currentDate.month)}</p>
          <button
            onClick={(e) => {
              e.preventDefault();

              if (currentDate.month === 11) {
                setCurrentDate({
                  ...currentDate,
                  month: 0,
                  year: currentDate.year + 1,
                });
                return;
              }

              setCurrentDate({
                ...currentDate,
                month: currentDate.month + 1,
              });
            }}
          >
            {'>'}
          </button>
        </div>

        <Calendar currentDate={currentDate} />
      </div>
    </div>
  );
}

function Calendar({
  currentDate,
}: {
  currentDate: { month: number; date: number; year: number };
}) {
  const firstDay = new Date(currentDate.year, currentDate.month, 1);
  // the offset in the start of the month
  const offset = firstDay.getDay();

  return (
    <div className={styles.calendar}>
      {offset !== 0 &&
        Array(offset)
          .fill(0)
          .map((_, i) => <p key={i + ' offset'}></p>)}

      {Array(35)
        .fill(0)
        .map((_, i) => {
          if (i === 0) return;
          const date = new Date(currentDate.year, currentDate.month, i);

          // check if date is in the month
          if (date.getMonth() === currentDate.month) {
            // date is in the month
            return <p>{i}</p>;
          } else {
            // date is not in the month ie: 7/32 == 8/1
            return <p></p>;
          }
        })}
    </div>
  );
}

export default DateSelector;
