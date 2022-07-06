import React from 'react';
import classnames from 'classnames';

import styles from '../../styles/layout/splitContent.module.css';

export const SplitContent = () => {
  return (
    <div className={styles.grid}>
      <figure
        className={classnames(styles.scrollBox, styles.boxGradientPrimary)}
      >
        <img
          className={styles.media}
          src="/images/projects/todooo-today.jpg"
          alt="TODO"
        />
        <figcaption className={styles.caption}>Todo List App (Vue)</figcaption>
      </figure>
      <figure className={classnames(styles.scrollBox)}>
        <video
          className={styles.media}
          controls
          loop
          poster="/videos/st-georges-poster.png"
        >
          <source src="/videos/st-georges.mp4" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <figcaption className={styles.caption}>
          St. George's, Weybridge (Vue, Strapi)
        </figcaption>
      </figure>
      <figure
        className={classnames(styles.scrollBox, styles.boxGradientSecondary)}
      >
        <img
          className={styles.media}
          src="/images/projects/polar.jpg"
          alt="TODO"
        />
        <figcaption className={styles.caption}>
          Polar Skate Co. (Redesign)
        </figcaption>
      </figure>
      <figure
        className={classnames(styles.scrollBox, styles.boxGradientTertiary)}
      >
        <img
          className={styles.media}
          src="/images/projects/world.jpg"
          alt="TODO"
        />
        <figcaption className={styles.caption}>
          World (React x Next, Strapi)
        </figcaption>
      </figure>

      {/* <div className={classnames(styles.scrollBox, {
          [styles.boxGradientPrimary]: boxGradient === 'primary',
          [styles.boxGradientSecondary]: boxGradient === 'secondary',
        })}>
          <img className={styles.media} src="/images/projects/todooo-today.jpg" alt="TODO" />
          {videos && videos.map((video, index) => (
            video.src.slice(-4) === '.mp4' ? 
              <video key={index} className={styles.media} controls loop poster={`/videos/${video.poster}`}>
                <source src={`/videos/${video.src}`} type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
              :
              <iframe 
                key={index}
                className={styles.videoEmbed}
                src={`https://www.youtube.com/embed/le_${video.src}`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
          ))}
        </div> */}
    </div>
  );
};
