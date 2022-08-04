import classnames from 'classnames';
import styles from '../../styles/blog/blogText.module.css';

interface BlogTextInterface {
  content: string;
}

export const BlogText = ({ content }: BlogTextInterface) => {
  return (
    <div
      className={classnames(styles.wrapper)}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
