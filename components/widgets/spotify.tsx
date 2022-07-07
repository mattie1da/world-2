import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../../styles/widgets/spotify.module.css';

import { Status, ErrorButton } from '..';
import Image from 'next/image';

export const SpotifyWidget = () => {
  const [loading, setLoading] = useState(true);
  const [spotifyData, setSpotifyData] = useState(null);
  const [error, setError] = useState(null);

  const getSpotifyData = async () => {
    setLoading(true);

    try {
      await axios.post('/api/spotify').then((response) => {
        setSpotifyData(response.data.data);
        setError(false);
      });
    } catch (err) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    getSpotifyData();

    const checkSpotify = setInterval(() => {
      console.log('check for spotify changes!');
      getSpotifyData();
    }, 300000);

    return () => clearInterval(checkSpotify);
  }, []);

  return (
    <>
      <div
        className={styles.thumbnailWrapper}
        style={{
          backgroundColor:
            loading || error
              ? 'hsl(var(--theme), var(--palette-saturation), var(--palette-lightness))'
              : 'transparent'
        }}
      >
        {!loading && spotifyData && (
          <Image
            className={styles.thumbnail}
            src={spotifyData.album.url}
            placeholder="blur"
            blurDataURL={spotifyData.album.plaiceholder}
            alt={`${spotifyData.name} album cover`}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div>
        <Status status={spotifyData && spotifyData.is_playing} />
        <figure>
          <blockquote
            cite={spotifyData && spotifyData.url}
            className={styles.title}
          >
            {loading
              ? 'Loading song...'
              : error
              ? 'Error fetching music 🥺'
              : spotifyData.name}
          </blockquote>
          <cite className={styles.description}>
            {loading
              ? 'Loading artist(s)...'
              : error
              ? 'Well, these things happen...'
              : spotifyData.artists.map((artist) => artist).join(' x ')}
          </cite>
        </figure>
        {error && (
          <ErrorButton text="try again" retryFunction={getSpotifyData} />
        )}
        {!loading && spotifyData && (
          <a
            className={styles.logo}
            href={spotifyData.url}
            target="_blank"
            aria-label="Visit song on Spotify - opens in new tab"
          >
            <svg
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M44.9997 -5.74051e-05C20.1475 -5.74051e-05 0 20.1472 0 44.9999C0 69.8534 20.1475 89.9999 44.9997 89.9999C69.8546 89.9999 90 69.8541 90 44.9999C90 20.1485 69.8546 0.00196765 44.999 0.00196765L44.9997 -0.000732422V-5.74051e-05ZM65.6365 64.9035C64.8305 66.2252 63.1005 66.645 61.7782 65.833C51.2131 59.3791 37.9121 57.9177 22.2481 61.4967C20.7388 61.8403 19.2342 60.8946 18.8899 59.3845C18.5443 57.8745 19.4866 56.3699 21 56.0263C38.1416 52.1099 52.8452 53.7961 64.707 61.0451C66.0293 61.8565 66.4485 63.5811 65.6365 64.9035ZM71.1445 52.6506C70.1286 54.301 67.9686 54.8221 66.3189 53.8069C54.2229 46.3716 35.7852 44.2183 21.4779 48.562C19.6223 49.1223 17.6628 48.0767 17.0998 46.2244C16.5409 44.3688 17.5872 42.4133 19.4394 41.849C35.7818 36.8903 56.0987 39.292 69.9896 47.8283C71.6393 48.8442 72.1604 51.0042 71.1452 52.6519V52.6513L71.1445 52.6506ZM71.6177 39.8914C57.1139 31.2768 33.1858 30.4851 19.3388 34.6877C17.1153 35.362 14.7636 34.1072 14.09 31.883C13.4163 29.6582 14.6705 27.3084 16.8953 26.6327C32.7909 21.807 59.2152 22.7392 75.9134 32.6525C77.9175 33.8399 78.5736 36.4225 77.3856 38.4199C76.203 40.4199 73.613 41.0794 71.6197 39.8914H71.6177V39.8914Z"
                  fill="#1ED760"
                />
              </g>
            </svg>
          </a>
        )}
      </div>
    </>
  );
};
