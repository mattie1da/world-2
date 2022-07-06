import styles from '../../styles/blog/blogList.module.css';

import { Card } from '../';
import { BlogItem } from '../widgets';

import { BlogItemInterface } from '../../types';
import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../../context/themePreferencesContext';

interface BlogListInterface {
  allBlogsData: Array<BlogItemInterface>;
}

export const BlogList = ({ allBlogsData }: BlogListInterface) => {
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogsData);
  const { state } = useContext(GlobalStateContext);

  useEffect(() => {
    const filteredBlogData = allBlogsData.filter(
      ({ tag }) => tag === state.blogFilter
    );

    setFilteredBlogs(filteredBlogData.length ? filteredBlogData : allBlogsData);
  }, [state.blogFilter, typeof window !== 'undefined']);

  return (
    filteredBlogs && (
      <div className={styles.section}>
        <ul className={styles.wrapper}>
          {filteredBlogs
            .map(
              ({
                id,
                authors,
                description,
                image,
                publishedAt,
                tag,
                title
              }) => (
                <li key={id.toString()} className={styles.blog}>
                  <Card type="blog">
                    <BlogItem
                      id={id}
                      authors={authors}
                      description={description}
                      image={image}
                      publishedAt={publishedAt}
                      tag={tag}
                      title={title}
                      url={`/diary/${id}`}
                    />
                  </Card>
                </li>
              )
            )
            .reverse()}
        </ul>
      </div>
    )
  );
};
