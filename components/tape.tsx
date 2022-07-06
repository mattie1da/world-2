import styles from '../styles/tape.module.css';
import classnames from 'classnames';
import { forwardRef } from 'react';
import { TapeInterface } from '../types';

export const Tape = forwardRef(({ position, size }: TapeInterface, ref) => {
  return (
    // @ts-ignore
    <aside
      ref={ref}
      className={classnames(styles.tape, {
        [styles.left]: position === 'left',
        [styles.right]: position === 'right',
        [styles.corner]: position === 'corner',
        [styles.large]: size === 'large'
      })}
    />
  );
});
