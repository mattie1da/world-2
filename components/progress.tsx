import styles from '../styles/progress.module.css';

interface ProgressInterface {
  progress: number;
}

export const Progress = ({ progress }: ProgressInterface) => {
  const cuteSupport = () => {
    if (progress <= 10) return "get cozy! you've got some reading to do";
    else if (progress > 10 && progress <= 30)
      return 'look at you go! you are a natural.';
    else if (progress > 30 && progress <= 50)
      return "i've never seen someone read so fast";
    else if (progress > 50 && progress <= 75) return 'blimey, over half way..';
    else if (progress > 75 && progress <= 98) return 'nearly done x';
    else if (progress > 98) return 'and relax ✨';
  };
  return (
    <>
      <p className={styles.percentage}>{progress}%</p>
      <progress className={styles.progress} max="100" value={progress} />
      <p className={styles.cuteSupport}>{cuteSupport()}</p>
    </>
  );
};
