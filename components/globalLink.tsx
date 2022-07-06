import styles from '../styles/globalLink.module.css';
import Link from 'next/link';

interface GlobalLinkInterface {
  text: string;
  url: string;
}

export const GlobalLink = ({ text, url }: GlobalLinkInterface) => {
  return (
    <div className={styles.link}>
      <Link href={url} passHref={url.substring(0, 7) === 'mailto:'}>
        {text}
      </Link>
      <span className={styles.accent}>
        &nbsp; <span className={styles.arrow}>&rarr;</span>
      </span>
    </div>
  );
};
