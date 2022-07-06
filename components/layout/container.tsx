import classnames from 'classnames';
import React from 'react';
import styles from '../../styles/layout/container.module.css';

interface ContainerInterface {
  children: React.ReactNode;
  dark?: boolean;
  thin?: boolean;
}

export const Container = ({ children, dark, thin }: ContainerInterface) => {
  return dark ? (
    <div className={styles.dark}>
      <div
        className={classnames(styles.wrapper, {
          [styles.thin]: thin
        })}
      >
        {children}
      </div>
    </div>
  ) : (
    <div
      className={classnames(styles.wrapper, {
        [styles.thin]: thin
      })}
    >
      {children}
    </div>
  );
};
