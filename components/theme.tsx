import styles from '../styles/theme.module.css';
import classnames from 'classnames';
import React from 'react';

interface ThemeInterface {
  children: React.ReactNode;
  state: {
    color: string;
    mode: string;
    prefersDarkModeInOS: boolean;
  };
}

export const Theme = ({ children, state }: ThemeInterface) => {
  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.red]: state.color === 'red',
        [styles.yellow]: state.color === 'yellow',
        [styles.green]: state.color === 'green',
        [styles.blue]: state.color === 'blue',
        [styles.purple]: state.color === 'purple',
        [styles.pink]: state.color === 'pink',
        [styles.dark]:
          (state.prefersDarkModeInOS || state.mode === 'dark') &&
          state.mode !== 'light'
      })}
    >
      {children}
    </div>
  );
};
