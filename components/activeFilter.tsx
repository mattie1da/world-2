import styles from '../styles/activeFilter.module.css';
import { GlobalStateContext } from '../context/themePreferencesContext';
import { useContext } from 'react';

interface ActiveFilterInterface {
  filter: string;
}

export const ActiveFilter = ({ filter }: ActiveFilterInterface) => {
  const { updateThemePreferences } = useContext(GlobalStateContext);

  return (
    <div className={styles.wrapper}>
      <p>Filter Applied: '{filter}'</p>
      <button onClick={() => updateThemePreferences('blogFilter', null)}>
        Clear filter
      </button>
    </div>
  );
};
