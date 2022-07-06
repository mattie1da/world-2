import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { isNightTime } from '../../helpers/isNightTime';

import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/widgets/dateAndTime.module.css';

export const DateAndTime = () => {
  const currentDate = () =>
    new Date().toLocaleDateString('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  const currentTime = () => {
    // TODO: tidy up dates x
    return {
      hour24: {
        complete: new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit'
        }),
        hours: (new Date().getHours() < 10 && '0') + new Date().getHours(),
        minutes: (new Date().getMinutes() < 10 && '0') + new Date().getMinutes()
      },
      hour12: new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/London',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };
  };
  const [time, setTime] = useState(currentTime());
  const [date, setDate] = useState(currentDate());

  const cuteWording = () => {
    const hour = new Date().getHours();

    if (hour === 12) {
      return "it's lunch time, brb!";
    } else if (hour >= 13 && hour <= 23) {
      return `${time.hour12} for normal people`;
    } else if (hour <= 6) {
      return "i'm probably sleeping";
    } else {
      return 'good morning! coffee time';
    }
  };

  useEffect(() => {
    const eggs = setInterval(() => {
      setTime(currentTime());

      if (time.hour24.complete === '00:00') {
        setDate(currentDate());
      }
    }, 1000);

    return () => clearInterval(eggs);
  }, []);
  return (
    <>
      <header className={styles.header}>
        <span className={styles.emoji}>{isNightTime() ? '🌒' : '🌍'}</span>
        <span className={styles.live}>
          <span className={classnames(styles.live, styles.blink)}></span>
          LIVE
        </span>
      </header>
      <footer className={styles.footer}>
        <h2 className={styles.date}>{date}</h2>
        <span className={styles.cute}>{cuteWording()}</span>
        <time className={styles.hour24}>
          {time.hour24.hours}
          <span className={utilStyles.accent}>:</span>
          <span className={utilStyles.textSmoke}>{time.hour24.minutes}</span>
        </time>
      </footer>
    </>
  );
};
