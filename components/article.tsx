import styles from '../styles/article.module.css';
import { SectionHeading } from './layout';

interface ArticleInterface {
  title: {
    preTitle: string;
    title: string;
  };
  content: string;
}

export const Article = ({ content, title }: ArticleInterface) => {
  return (
    <article className={styles.wrapper}>
      {title && (
        <SectionHeading title={title.title} preTitle={title.preTitle} />
      )}
      <div className={styles.articleBody}>{content}</div>
    </article>
  );
};
