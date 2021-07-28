import { useEffect, useState } from 'react';
import { FormikProps } from 'formik';

import styles from '@css/TimeSelector.module.css';

const today = new Date();
function TimeSelector({ setFieldValue }: FormikProps<any>) {
  const [currentTime, setCurrentTime] = useState({
    hour: today.getHours() % 12,
    minutes: today.getMinutes(),
    pm: today.getHours() > 12,
  });

  useEffect(() => {
    setFieldValue('time', currentTime);
  }, [currentTime, setFieldValue]);

  return (
    <div>
      <p>
        {currentTime.hour}:
        {(currentTime.minutes ?? 0) < 10
          ? '0' + currentTime.minutes
          : currentTime.minutes}
        {currentTime.pm ? 'PM' : 'AM'}
      </p>

      <p>HOURS</p>
      <input
        type="number"
        maxLength={2}
        value={currentTime.hour.toString().replace(' ', '')}
        onChange={(e) => {
          const value = parseInt(e.target.value);

          if (isNaN(value)) {
            setCurrentTime({
              ...currentTime,
              hour: 0,
            });
            return;
          }

          if (value < 1) {
            setCurrentTime({
              ...currentTime,
              hour: 1,
            });
            return;
          }

          setCurrentTime({
            ...currentTime,
            hour: value > 12 ? 12 : value,
          });
        }}
      />

      <p>MINUTES</p>
      <input
        type="number"
        maxLength={2}
        value={currentTime.minutes.toString().replace(' ', '')}
        onChange={(e) => {
          const value = parseInt(e.target.value);

          if (isNaN(value)) {
            setCurrentTime({
              ...currentTime,
              minutes: 0,
            });
            return;
          }

          if (value < 0) {
            setCurrentTime({
              ...currentTime,
              minutes: 0,
            });
            return;
          }

          setCurrentTime({
            ...currentTime,
            minutes: value > 59 ? 59 : value,
          });
        }}
      />

      <p>PM</p>
      <Toggle
        value={currentTime.pm}
        onChange={(on) => {
          console.log(on);
          setCurrentTime({
            ...currentTime,
            pm: on,
          });
        }}
        offText={'Turn to AM'}
        onText={'Turn to PM'}
      />
    </div>
  );
}

function Toggle({
  value,
  onChange,
  onText,
  offText,
}: {
  value: boolean;
  onChange: (state: boolean) => void;
  onText: string;
  offText: string;
}) {
  const [on, setOn] = useState(value);

  const toggle = () => {
    setOn(!on);
    onChange(on);
  };

  if (on)
    return (
      <button onClick={toggle} type="button">
        {onText}
      </button>
    );

  return (
    <button onClick={toggle} type="button">
      {offText}
    </button>
  );
}

export default TimeSelector;
