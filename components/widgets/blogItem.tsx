import Link from 'next/link';

import styles from '../../styles/widgets/blogItem.module.css';

import { Avatar, DateParser, GlobalLink, Tag } from '../';

import { BlogItemInterface } from '../../types';

export const BlogItem = ({
  url,
  image,
  authors,
  publishedAt,
  title,
  description,
  tag
}: BlogItemInterface) => {
  return (
    <>
      <aside className={styles.tag}>
        <Tag name={tag} />
      </aside>
      {/* TODO: next image */}
      <div className={styles.thumbnailWrapper}>
        <img
          className={styles.thumbnail}
          src={image.url}
          alt={image.alt}
        />
      </div>
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.avatars}>
            {authors.map((author, index) => (
              <Avatar key={index} author={author} />
            ))}
          </div>
          <span className={styles.date}>
            <DateParser dateString={publishedAt} />
          </span>
        </header>
        <footer>
          <h3 className={styles.title}>
            <Link href={url}>{title}</Link>
          </h3>
          <p className={styles.description}>{description}</p>
          <GlobalLink text="Read full post" url={url} />
        </footer>
      </div>
    </>
  );
};
