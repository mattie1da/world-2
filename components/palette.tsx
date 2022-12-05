import styles from '../styles/palette.module.css';
import utilStyles from '../styles/utils.module.css';
import classnames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { GlobalStateContext } from '../context/themePreferencesContext';
import { randomItem } from '../helpers/randomItem';
import { Mode } from './';
import {
  BlueColor,
  GreenColor,
  PinkColor,
  PurpleColor,
  RedColor,
  YellowColor
} from './colors';
import { paletteReveal } from './animations/paletteReveal';
import { compliments } from '../lib/compliments';

export const Palette = () => {
  const { state, updateThemePreferences } = useContext(GlobalStateContext);
  const colorsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    paletteReveal(colorsRef.current);
  }, []);

  const renderColors = () => (
    <>
      <PinkColor />
      <RedColor />
      <YellowColor />
      <GreenColor />
      <BlueColor />
      <PurpleColor />
    </>
  );

  return (
    <div className={styles.wrapper} ref={colorsRef}>
      <div>
        <p className={styles.label}>
          Pick your accent colour <span>- make yourself at home..</span>
        </p>

        <div className={styles.scroller}>
          <div className={styles.palette}>
            {renderColors()}
            <label
              htmlFor="theme-pink"
              className={classnames(utilStyles.fontCute, styles.colorLabel, {
                [styles.colorLabelActive]: state.color === 'pink'
              })}
            >
              pink
            </label>
            <label
              htmlFor="theme-red"
              className={classnames(utilStyles.fontCute, styles.colorLabel, {
                [styles.colorLabelActive]: state.color === 'red'
              })}
            >
              red
            </label>
            <label
              htmlFor="theme-yellow"
              className={classnames(utilStyles.fontCute, styles.colorLabel, {
                [styles.colorLabelActive]: state.color === 'yellow'
              })}
            >
              yellow
            </label>
            <label
              htmlFor="theme-green"
              className={classnames(utilStyles.fontCute, styles.colorLabel, {
                [styles.colorLabelActive]: state.color === 'green'
              })}
            >
              green
            </label>
            <label
              htmlFor="theme-blue"
              className={classnames(utilStyles.fontCute, styles.colorLabel, {
                [styles.colorLabelActive]: state.color === 'blue'
              })}
            >
              blue
            </label>
            <label
              htmlFor="theme-purple"
              className={classnames(utilStyles.fontCute, styles.colorLabel, {
                [styles.colorLabelActive]: state.color === 'purple'
              })}
            >
              purple
            </label>
          </div>
        </div>

        <p className={classnames(utilStyles.fontCute, styles.compliment)}>
          {randomItem(compliments)}
        </p>
      </div>
      <div className={styles.modesWrapper}>
        <p className={styles.label}>
          Choose your lighting <span> - protect those eyes!</span>
        </p>

        <Mode updateThemePreferences={updateThemePreferences} state={state} />
      </div>
    </div>
  );
};
