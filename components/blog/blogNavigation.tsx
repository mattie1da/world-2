import { useEffect, useRef, useState } from 'react';
import { useScrollSpy } from '../../helpers/useScrollSpy';
import classnames from 'classnames';

import styles from '../../styles/blog/blogNavigation.module.css';

import { Progress } from '../';

interface ProgressInterface {
  progress: number;
}

const useHeadings = () => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName.substring(1))
      }));
    setHeadings(elements);
  }, []);
  return headings;
};

export const BlogNavigation = ({ progress }: ProgressInterface) => {
  const listRef = useRef(null);
  const listItems = useRef([]);
  const headings = useHeadings();

  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: '0% 0% -25% 0%' }
  );

  return (
    <div className={styles.nav}>
      <nav className={styles.wrapper}>
        <div className={styles.listWrapper}>
          <ul ref={listRef} className={styles.list}>
            {headings.map((heading, index) => (
              <li
                key={heading.id}
                ref={(el) => (listItems.current[index] = el)}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();

                    document.querySelector(`#${heading.id}`).scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  href={`#${heading.id}`}
                  className={classnames(styles.item, {
                    [styles.active]: activeId === heading.id
                  })}
                  style={{ paddingLeft: `${heading.level - 2}em` }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Progress progress={progress} />
      </nav>
    </div>
  );
};
