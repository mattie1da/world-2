import styles from '../styles/status.module.css';
import { useEffect, useRef } from 'react';
import {
  offlineAnimation,
  onlineAnimation
} from './animations/statusAnimations';

interface StatusInterface {
  status: boolean;
}

export const Status = ({ status }: StatusInterface) => {
  const online = useRef([]);
  const offline = useRef([]);

  useEffect(() => {
    status
      ? onlineAnimation(online.current)
      : offlineAnimation(offline.current);
  }, [status]);

  return (
    <aside className={styles.status}>
      {status ? (
        <>
          <div className={styles.volume}>
            <span
              className={styles.bar}
              ref={(el) => (online.current[0] = el)}
            ></span>
            <span
              className={styles.bar}
              ref={(el) => (online.current[1] = el)}
            ></span>
            <span
              className={styles.bar}
              ref={(el) => (online.current[2] = el)}
            ></span>
          </div>
          <p className={styles.message}>i'm online! now playing:</p>
        </>
      ) : (
        <>
          <svg
            className={styles.sleep}
            width="17"
            height="19"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={(el) => (offline.current[0] = el)}
              d="M2.58315 16.5457L6.53423 16.6311L6.49448 18.4708L0 18.3304L0.03905 16.5229L4.02282 11.3917L0.16772 11.3083L0.20747 9.46875L6.63797 9.60775L6.59891 11.4154L2.58315 16.5457Z"
              fill="#FF8383"
            />
            <path
              ref={(el) => (offline.current[1] = el)}
              d="M13.1836 11.9888L16.147 12.0529L16.1171 13.4326L11.2463 13.3274L11.2756 11.9717L14.2634 8.12325L11.3721 8.06085L11.4019 6.68115L16.2248 6.78535L16.1955 8.14105L13.1836 11.9888Z"
              fill="#FF8383"
            />
            <path
              ref={(el) => (offline.current[2] = el)}
              d="M7.42854 6.4323L9.40407 6.475L9.38417 7.3948L6.13696 7.3246L6.15649 6.4208L8.14837 3.8553L6.22082 3.8136L6.24069 2.8938L9.45597 2.9633L9.43637 3.8671L7.42854 6.4323Z"
              fill="#FF8383"
            />
            <path
              ref={(el) => (offline.current[3] = el)}
              d="M13.0517 2.6538L14.5333 2.6858L14.5184 3.3757L12.083 3.3231L12.0976 2.6452L13.5916 0.720999L12.1459 0.6898L12.1608 0L14.5722 0.0520992L14.5576 0.7299L13.0517 2.6538Z"
              fill="#FF8383"
            />
          </svg>
          <p className={styles.message}>i'm offline. last played:</p>
        </>
      )}
    </aside>
  );
};
