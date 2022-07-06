// TODO: Next Image
import Image from 'next/image';

import styles from '../styles/avatar.module.css';
import classnames from 'classnames';

import { AuthorInterface } from '../types';

interface AvatarInterface {
  author: AuthorInterface;
  size?: string;
}

export const Avatar = ({ author, size }: AvatarInterface) => {
  return (
    // change this to a <figure> with a figcaption that appears on hover?
    <img
      className={classnames(styles.avatar, {
        [styles.large]: size === 'large'
      })}
      src={author.picture.url}
      alt={`Headshot of ${author.name}`}
      title={author.name}
    />
  );
};
