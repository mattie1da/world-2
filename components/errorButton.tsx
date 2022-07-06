import styles from '../styles/errorButton.module.css';

interface errorButtonInterface {
  text: string;
  retryFunction: Function;
}

export const ErrorButton = ({ retryFunction, text }: errorButtonInterface) => {
  return (
    <button className={styles.button} onClick={() => retryFunction()}>
      <span className={styles.buttonIcon}>&#8635;</span>
      <span className={styles.buttonCute}>{text}</span>
    </button>
  );
};
