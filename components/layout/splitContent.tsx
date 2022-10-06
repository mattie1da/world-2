import React from 'react';
import classnames from 'classnames';

import styles from '../../styles/layout/splitContent.module.css';
import Image from 'next/image';

export const SplitContent = () => {
  return (
    <div className={styles.grid}>
      <figure
        className={classnames(styles.scrollBox, styles.boxGradientTertiary)}
      >
        <div className={styles.media}>
          <video
            className={styles.media}
            controls
            loop
            poster="/videos/world-2-poster.webp"
          >
            <source src="/videos/world-2.mp4" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
        <figcaption className={styles.caption}>
          World (React, Next.js, Typescript, Strapi)
        </figcaption>
      </figure>
      <figure
        className={classnames(styles.scrollBox, styles.boxGradientPrimary)}
      >
        <div className={styles.media}>
          <video
            className={styles.media}
            controls
            loop
            poster="/videos/todooo-today-poster.webp"
          >
            <source src="/videos/todooo-today.mp4" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
        <figcaption className={styles.caption}>Todo List App (Vue)</figcaption>
      </figure>
      <figure
        className={classnames(styles.scrollBox, styles.boxGradientSecondary)}
      >
        <video
          className={styles.media}
          controls
          loop
          poster="/videos/beth-larcombe-poster.webp"
        >
          <source src="/videos/beth-larcombe.mp4" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <figcaption className={styles.caption}>
          Beth Larcombe (React, Next.js, Typescript)
        </figcaption>
      </figure>
      <figure className={classnames(styles.scrollBox)}>
        <video
          className={styles.media}
          controls
          loop
          poster="/videos/st-georges-poster.webp"
        >
          <source src="/videos/st-georges.mp4" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <figcaption className={styles.caption}>
          St. George's, Weybridge (Vue, Strapi)
        </figcaption>
      </figure>
    </div>
  );
};
