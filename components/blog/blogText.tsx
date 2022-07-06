import classnames from 'classnames';

import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/blog/blogText.module.css';

interface BlogTextInterface {
  content: string;
}

export const BlogText = ({ content }: BlogTextInterface) => {
  return (
    <div
      className={classnames(utilStyles.articleBody, styles.wrapper)}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
