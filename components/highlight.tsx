import styles from '../styles/highlight.module.css';

interface HighlightInterface {
  text: string;
}

export const Highlight = ({ text }: HighlightInterface) => {
  return (
    <span className={styles.highlight}>
      <span className={styles.text}>{text}</span>
    </span>
  );
};
