import styles from '../styles/mode.module.css';
import classnames from 'classnames';

export const Mode = ({ updateThemePreferences, state }) => {
  const renderAutoRadio = () => {
    return (
      <input
        className={styles.auto}
        id="auto"
        type="radio"
        name="mode"
        value="auto"
        checked={state.mode === 'auto'}
        readOnly
      />
    );
  };

  const renderAutoLabel = () => {
    return (
      <label
        className={classnames(styles.label, {
          [styles.active]: state.mode === 'auto'
        })}
        htmlFor="auto"
      >
        auto
      </label>
    );
  };

  const renderDarkRadio = () => {
    return (
      <input
        onChange={() => updateThemePreferences('mode', 'dark')}
        className={styles.dark}
        id="dark"
        type="radio"
        name="mode"
        value="dark"
        checked={state.mode === 'dark'}
      />
    );
  };

  const renderDarkLabel = () => {
    return (
      <label
        className={classnames(styles.label, {
          [styles.active]: state.mode === 'dark'
        })}
        htmlFor="dark"
      >
        dark
      </label>
    );
  };

  const renderLightRadio = () => {
    return (
      <input
        onChange={() => updateThemePreferences('mode', 'light')}
        className={styles.light}
        id="light"
        type="radio"
        name="mode"
        value="light"
        checked={state.mode === 'light'}
      />
    );
  };

  const renderLightLabel = () => {
    return (
      <label
        className={classnames(styles.label, {
          [styles.active]: state.mode === 'light'
        })}
        htmlFor="light"
      >
        light
      </label>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.switchWrapper}>
        <div className={styles.switch}>
          {state.mode === 'auto' && state.prefersDarkModeInOS
            ? renderAutoRadio()
            : renderDarkRadio()}
          {state.mode === 'auto' && !state.prefersDarkModeInOS
            ? renderAutoRadio()
            : renderLightRadio()}
        </div>
        <div className={styles.modes}>
          {state.mode === 'auto' && state.prefersDarkModeInOS
            ? renderAutoLabel()
            : renderDarkLabel()}
          {state.mode === 'auto' && !state.prefersDarkModeInOS
            ? renderAutoLabel()
            : renderLightLabel()}
        </div>
      </div>
      {state.mode !== 'auto' && (
        <button
          onClick={() => updateThemePreferences('mode', 'auto')}
          className={styles.button}
        >
          auto
        </button>
      )}
    </div>
  );
};
