import { ReactElement, useEffect, createRef, useState } from 'react';
import styles from '@css/Dropdown.module.css';

interface DropdownProps {
  label: ReactElement;
  content: ReactElement | ReactElement[];
  // whether or not the dropdown should be shown on default
  current: boolean;
}

function Dropdown({ label, content, current }: DropdownProps) {
  const [showing, setShowing] = useState(current);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#555"
            width="25px"
            height="25px"
            style={{
              transform: showing ? 'rotateZ(-180deg)' : 'rotateZ(0deg)',
            }}
            onClick={() => {
              // if (!showing && contentRef.current)
              // contentRef.current.style.display = 'block';
              setShowing(!showing);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {showing && content}
    </div>
  );
}

export default Dropdown;
