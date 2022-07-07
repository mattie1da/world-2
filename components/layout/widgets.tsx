import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// styles
import classnames from 'classnames';
import styles from '../../styles/layout/widgets.module.css';
import utilStyles from '../../styles/utils.module.css';

// components
import { Card, ErrorButton } from '../';
import {
  DateAndTime,
  SpotifyWidget,
  WeatherWidget,
  BlogItem,
  DataWidget
} from '../widgets';

// types
import { BlogItemInterface } from '../../types';
import { DateParser } from '../date';
import { IconStrava } from '../icons';
import { widgetsReveal } from '../animations/widgetsReveal';

interface WidgetsInterface {
  featuredArticle: BlogItemInterface;
}

export const Widgets = ({ featuredArticle }: WidgetsInterface) => {
  const widgets = useRef([]);
  const [stravaData, setStravaData] = useState(null);
  const [stravaLoading, setStravaLoading] = useState(true);
  const [stravaError, setStravaError] = useState(false);

  const getStravaData = async () => {
    try {
      await axios.post('/api/strava').then((response) => {
        setStravaData(response.data.data);
        setStravaError(false);
      });
    } catch (err) {
      setStravaError(true);
    }

    setStravaLoading(false);
  };

  useEffect(() => {
    getStravaData();

    widgetsReveal(widgets.current);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${utilStyles.grid} ${styles.grid}`}>
        <div className={styles.tall} ref={(el) => (widgets.current[0] = el)}>
          <Card tape={{ position: 'left', size: 'large' }}>
            <SpotifyWidget />
          </Card>
          <p className={classnames(utilStyles.fontCute, styles.label)}>spotify web api</p>
        </div>
        <div ref={(el) => (widgets.current[1] = el)}>
          <Card tape={{ position: 'left' }} type="date">
            <DateAndTime />
          </Card>
          <p className={classnames(utilStyles.fontCute, styles.label)}>my local date and time 🇬🇧</p>
        </div>
        <div className={styles.weather} ref={(el) => (widgets.current[2] = el)}>
          <Card tape={{ position: 'right' }} type="weather">
            <WeatherWidget />
          </Card>
          <p className={classnames(utilStyles.fontCute, styles.label)}>weather api</p>
        </div>
        <div ref={(el) => (widgets.current[4] = el)} className={styles.blog}>
          <Card tape={{ position: 'corner' }} type="blog">
            <BlogItem
              id={featuredArticle.id}
              image={featuredArticle.image}
              authors={featuredArticle.authors}
              description={featuredArticle.description}
              publishedAt={featuredArticle.publishedAt}
              title={featuredArticle.title}
              tag={featuredArticle.tag}
              url={`/diary/${featuredArticle.id}`}
            />
          </Card>
          <p className={classnames(utilStyles.fontCute, styles.label)}>backend, strapi cms</p>
        </div>
        <div className={styles.strava} ref={(el) => (widgets.current[3] = el)}>
          <Card tape={{ position: 'left' }}>
            <DataWidget
              title="Strava 🐾"
              description={
                stravaLoading ? (
                  <>
                    <span className={utilStyles.textSmoke}>
                      fetching my latest activity
                    </span>
                    <span className={utilStyles.accent}>...</span>
                    <strong>👷🏼</strong>
                  </>
                ) : stravaData ? (
                  <>
                    <span className={utilStyles.textSmoke}>
                      my latest activity
                    </span>
                    <span className={utilStyles.accent}>: </span>
                    {new Date(stravaData.date).toLocaleDateString('en-GB', {
                      timeZone: 'Europe/London',
                      day: 'numeric',
                      month: 'short',
                      year: '2-digit'
                    }) ===
                    new Date().toLocaleDateString('en-GB', {
                      timeZone: 'Europe/London',
                      day: 'numeric',
                      month: 'short',
                      year: '2-digit'
                    }) ? (
                      <strong>Today</strong>
                    ) : (
                      <strong>
                        <DateParser dateString={stravaData.date} />
                      </strong>
                    )}
                  </>
                ) : (
                  <>
                    <span className={utilStyles.textSmoke}>
                      something went wrong
                    </span>
                    <span className={utilStyles.accent}>!</span>
                  </>
                )
              }
              data={[
                {
                  title: 'Activity Name',
                  description: stravaLoading
                    ? 'Loading...'
                    : stravaData
                    ? stravaData.name
                    : '---'
                },
                {
                  title: 'Distance',
                  description: stravaLoading
                    ? 'Loading...'
                    : stravaData
                    ? stravaData.distance
                    : '---'
                },
                {
                  title: 'Avg. Heartrate',
                  description: stravaLoading
                    ? 'Loading...'
                    : stravaData
                    ? stravaData.average_heartrate
                    : '---'
                },
                {
                  title: 'Time',
                  description: stravaLoading
                    ? 'Loading...'
                    : stravaData
                    ? stravaData.moving_time
                    : '---'
                }
              ]}
              image={
                <a
                  href="https://strava.com/athletes/matthew-wyatt"
                  target="_blank"
                  aria-label="Visit my Strava profile - opens in new tab"
                >
                  <IconStrava />
                </a>
              }
              button={
                stravaError && (
                  <ErrorButton text="try again" retryFunction={getStravaData} />
                )
              }
              footer={
                <>
                  <p>
                    🏆&nbsp;&nbsp;
                    {!stravaLoading && stravaData
                      ? stravaData.meta.achievements
                      : '---'}
                  </p>
                  <p>
                    👍&nbsp;&nbsp;
                    {!stravaLoading && stravaData
                      ? stravaData.meta.kudos
                      : '---'}
                  </p>
                  <p>
                    💬&nbsp;&nbsp;
                    {!stravaLoading && stravaData
                      ? stravaData.meta.comments
                      : '---'}
                  </p>
                </>
              }
            />
          </Card>
          <p className={classnames(utilStyles.fontCute, styles.label)}>strava api</p>
        </div>
      </div>
      {/* <div className={styles.camera} ref={(el) => widgets.current[6] = el}>
        <CameraWidget />
      </div> */}
    </div>
  );
};
