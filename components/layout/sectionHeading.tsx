import classnames from 'classnames';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/layout/sectionHeading.module.css';

interface SectionHeadingInterface {
  title: string;
  preTitle: string;
}

export const SectionHeading = ({
  title,
  preTitle
}: SectionHeadingInterface) => {
  return (
    <div className={styles.wrapper}>
      <p className={classnames(utilStyles.fontCute, styles.preTitle)}>{preTitle}</p>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};
