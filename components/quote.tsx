import styles from '../styles/quote.module.css';

import { AuthorInterface } from '../types';

interface QuoteInterface {
  text: string;
  author: AuthorInterface;
}

export const Quote = ({ text, author }: QuoteInterface) => {
  return (
    <figure className={styles.wrapper}>
      <blockquote className={styles.quote}>
        <em>{text}"</em>
      </blockquote>
      <figcaption className={styles.author}>{author}</figcaption>
    </figure>
  );
};
