import classnames from 'classnames';
import { useContext } from 'react';
import { GlobalStateContext } from '../context/themePreferencesContext';
import styles from '../styles/colors.module.css';

interface ColorInterface {
  small?: boolean;
  button?: boolean;
}

export const YellowColor = ({ small }: ColorInterface) => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  return (
    <input
      type="radio"
      name="theme"
      id="theme-yellow"
      aria-label="change colour theme to yellow"
      className={classnames(styles.color, styles.yellow, {
        [styles.active]: state.color === 'yellow',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'yellow')}
    />
  );
};

export const PinkColor = ({ small, button }: ColorInterface) => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  return button ? (
    <button
      type="button"
      aria-label="Change colour theme to pink"
      className={classnames(styles.color, styles.pink, {
        [styles.active]: state.color === 'pink',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'pink')}
    />
  ) : (
    <input
      type="radio"
      name="theme"
      id="theme-pink"
      aria-label="change colour theme to pink"
      className={classnames(styles.color, styles.pink, {
        [styles.active]: state.color === 'pink',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'pink')}
    />
  );
};

export const RedColor = ({ small }: ColorInterface) => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  return (
    <input
      type="radio"
      name="theme"
      id="theme-red"
      aria-label="change colour theme to red"
      className={classnames(styles.color, styles.red, {
        [styles.active]: state.color === 'red',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'red')}
    />
  );
};

export const GreenColor = ({ small }: ColorInterface) => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  return (
    <input
      type="radio"
      name="theme"
      id="theme-green"
      aria-label="change colour theme to green"
      className={classnames(styles.color, styles.green, {
        [styles.active]: state.color === 'green',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'green')}
    />
  );
};

export const BlueColor = ({ small, button }: ColorInterface) => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  return button ? (
    <button
      type="button"
      aria-label="Change colour theme to blue"
      className={classnames(styles.color, styles.blue, {
        [styles.active]: state.color === 'blue',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'blue')}
    />
  ) : (
    <input
      type="radio"
      name="theme"
      id="theme-blue"
      aria-label="change colour theme to blue"
      className={classnames(styles.color, styles.blue, {
        [styles.active]: state.color === 'blue',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'blue')}
    />
  );
};

export const PurpleColor = ({ small }: ColorInterface) => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  return (
    <input
      type="radio"
      name="theme"
      id="theme-purple"
      aria-label="change colour theme to purple"
      className={classnames(styles.color, styles.purple, {
        [styles.active]: state.color === 'purple',
        [styles.small]: small
      })}
      onClick={() => updateThemePreferences('color', 'purple')}
    />
  );
};

export const ModeToggle = () => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  return (
    <button
      className={styles.modeToggle}
      onClick={() =>
        updateThemePreferences(
          'mode',
          state.mode === 'auto'
            ? state.prefersDarkModeInOS
              ? 'light'
              : 'dark'
            : state.mode === 'dark'
            ? 'light'
            : 'dark'
        )
      }
    >
      {state.mode === 'auto'
        ? state.prefersDarkModeInOS
          ? '💡'
          : '🌒'
        : state.mode === 'dark'
        ? '💡'
        : '🌒'}
    </button>
  );
};
