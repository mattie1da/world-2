import styles from '../styles/card.module.css';
import { Tape } from './';
import classnames from 'classnames';
import React, { forwardRef } from 'react';
import { TapeInterface } from '../types';

interface CardInterface {
  children: React.ReactNode;
  heading?: string;
  tape?: TapeInterface;
  type?: string;
}

export const Card = forwardRef(
  ({ heading, type, tape, children }: CardInterface, ref) => {
    return (
      <>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        <div
          className={classnames(styles.card, {
            [styles.blog]: type === 'blog',
            [styles.weather]: type === 'weather',
            [styles.date]: type === 'date'
          })}
        >
          {tape && <Tape {...tape} ref={ref} />}
          {children}
        </div>
      </>
    );
  }
);
