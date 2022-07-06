import { useEffect, useState } from 'react';
import { isNightTime } from '../../helpers/isNightTime';

import styles from '../../styles/widgets/weather.module.css';
import utilStyles from '../../styles/utils.module.css';
import { ErrorButton } from '../';

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);

      await fetch('/api/weather')
        .then((response) => response.json())
        .then((data) => {
          const resolvedData = {
            celcius: data.data.main.temp,
            weather: data.data.weather[0].main
          };

          setWeatherData(resolvedData);
          setError(false);
        });
    } catch (err) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const WeatherConditions = ({ title, subtitle }) => {
    return (
      <>
        {title}
        <span className={utilStyles.accent}>..</span>
        &nbsp;<span className={styles.subTitle}>{subtitle}</span>
      </>
    );
  };

  const renderFunWeather = (conditionFromApi) => {
    if (isNightTime()) {
      return <WeatherConditions title="Dark" subtitle="i sleep 🌛" />;
    }

    switch (conditionFromApi) {
      case 'Clear':
        return <WeatherConditions title="Sunny" subtitle="a miracle ☀️" />;
      case 'Clouds':
        return <WeatherConditions title="Cloudy" subtitle="like usual ☁️" />;
      case 'Rain':
        return <WeatherConditions title="Raining" subtitle="take cover ☔️" />;
      case 'Drizzle':
        return <WeatherConditions title="Drizzle" subtitle="how boring 🌧" />;
      default:
        return conditionFromApi;
    }
  };

  return (
    <>
      <dl className={styles.wrapper}>
        <dt className={styles.temperature}>
          {weatherData && !loading
            ? `${Math.round(weatherData.celcius)}`
            : '--'}
          <span className={utilStyles.accent}>&deg;</span>
          <span className={styles.farenheit}>
            {loading
              ? 'hold tight weather man'
              : weatherData
              ? `that's a whopping ${Math.round(
                  weatherData.celcius * 1.8 + 32
                )}\xB0F`
              : 'hmm.. something went wrong'}
          </span>
        </dt>
        <dd className={utilStyles.visuallyHidden}>
          Current temperature in degrees
        </dd>
      </dl>
      <footer>
        <h3 className={styles.title}>
          {loading
            ? 'Checking weather...'
            : weatherData
            ? renderFunWeather(weatherData.weather)
            : "Can't get weather 👷🏼"}
        </h3>
        {error ? (
          <ErrorButton text="try again" retryFunction={fetchWeatherData} />
        ) : (
          <p className={styles.description}>Hampshire, England</p>
        )}
      </footer>
    </>
  );
};
