import Image from 'next/image';

import { useContext } from 'react';
import { GlobalStateContext } from '../../context/themePreferencesContext';

// styles
import classnames from 'classnames';
import styles from '../../styles/layout/hero.module.css';

// components
import { DateParser, Tag, ActiveFilter } from '../../components';
import { Breadcrumb } from '../layout';
import { Avatars } from '../partials';

// types
import { AuthorInterface, BreadcrumbInterface } from '../../types';
import { useRouter } from 'next/router';
import { Container } from './container';

interface HeroInterface {
  breadcrumb?: BreadcrumbInterface;
  home?: boolean;
  lead?: string;
  title: string;
  image?: {
    alt: string;
    url: string;
  };
  withMeta?: {
    authors?: Array<AuthorInterface>;
    date?: string;
    readTime?: number;
    tags?: Array<string>;
  };
}

export const Hero = ({
  breadcrumb,
  home,
  lead,
  title,
  withMeta,
  image
}: HeroInterface) => {
  const router = useRouter();
  const { state } = useContext(GlobalStateContext);
  const renderTags = () =>
    withMeta.tags.map((tag, index) => <Tag key={index} name={tag} />);

  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.marginBottom]: !home,
        [styles.hasImage]: image
      })}
    >
      {image && (
        <>
          <Image className={styles.image}
            src={image.url}
            alt={image.alt} layout="fill" objectFit="cover" 
          />
          <span className={styles.imageWash} />
        </>
      )}
      <Container>
        {breadcrumb && (
          <Breadcrumb crumbs={breadcrumb.crumbs} current={breadcrumb.current} />
        )}
        <h1
          className={classnames(styles.title, { [styles.withMeta]: withMeta })}
        >
          {title}
        </h1>
      </Container>

      <Container>
        {lead && <p className={styles.lead}>{lead}</p>}

        {withMeta && (
          <div className={styles.meta}>
            {withMeta.authors && (
              <Avatars size={'large'} authors={withMeta.authors} />
            )}
            {withMeta.tags && renderTags()}
            {withMeta.readTime && (
              <p className={styles.readTime}>{withMeta.readTime} min read</p>
            )}
            {withMeta.date && (
              <div className={styles.date}>
                <DateParser dateString={withMeta.date} />
              </div>
            )}
            {state.blogFilter && router.pathname === '/diary' && (
              <ActiveFilter filter={state.blogFilter} />
            )}
          </div>
        )}
      </Container>
    </div>
  );
};
