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
    <div className={classnames(styles.avatar, {
        [styles.large]: size === 'large'
      })}>
        <Image 
          src={author.picture.url} 
          layout="fill" 
          objectFit="cover"
          alt={`Headshot of ${author.name}`} 
          title={author.name} 
        />
      </div>
  );
};
