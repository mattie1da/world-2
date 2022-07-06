import styles from '../../styles/partials/avatars.module.css';
import { Avatar } from '../';

import { AuthorInterface } from '../../types';

interface AvatarsInterface {
  authors: Array<AuthorInterface>;
  size: string;
}

export const Avatars = ({ authors, size }: AvatarsInterface) => {
  return (
    <div className={styles.wrapper}>
      {authors.map((author, index) => (
        <Avatar key={index} author={author} size={size} />
      ))}
    </div>
  );
};
