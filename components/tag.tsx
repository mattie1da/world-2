import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GlobalStateContext } from '../context/themePreferencesContext';
import styles from '../styles/tag.module.css';
import classnames from 'classnames';

interface TagInterface {
  name: string;
}

export const Tag = ({ name }: TagInterface) => {
  const router = useRouter();
  const { state, updateThemePreferences } = useContext(GlobalStateContext);

  const setFilter = (name) => {
    updateThemePreferences('blogFilter', name);
  };

  return router.pathname == '/diary' ? (
    <button
      onClick={() => setFilter(name)}
      className={classnames(styles.tag, {
        [styles.active]: state.blogFilter === name
      })}
      title={`Apply ${name} filter`}
    >
      <span className={styles.text}>#{name}</span>
    </button>
  ) : (
    <Link href="/diary">
      <a className={styles.tag} onClick={() => setFilter(name)}>
        <span className={styles.text}>#{name}</span>
      </a>
    </Link>
  );
};
