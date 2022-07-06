import styles from '../styles/article.module.css';
import { SectionHeading } from './layout';
import { useEffect, useRef } from 'react';
import { articleReveal } from './animations/articleReveal';

interface ArticleInterface {
  title: {
    preTitle: string;
    title: string;
  };
  content: string;
}

export const Article = ({ content, title }: ArticleInterface) => {
  const headingRef = useRef();

  useEffect(() => {
    articleReveal(headingRef.current);
  }, []);
  return (
    <article ref={headingRef} className={styles.wrapper}>
      {title && (
        <SectionHeading title={title.title} preTitle={title.preTitle} />
      )}
      <div className={styles.articleBody}>{content}</div>
    </article>
  );
};
