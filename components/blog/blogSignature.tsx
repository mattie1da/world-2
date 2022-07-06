import styles from '../../styles/blog/blogSignature.module.css';

import { Avatars } from '../partials';
import { Breadcrumb } from '../layout';

import { AuthorInterface, BreadcrumbInterface } from '../../types';

interface BlogSignatureInterface {
  authors: Array<AuthorInterface>;
  breadcrumb: BreadcrumbInterface;
}

export const BlogSignature = ({
  authors,
  breadcrumb
}: BlogSignatureInterface) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3>That's all he wrote.&nbsp; 🦔</h3>
      </header>
      <Breadcrumb crumbs={breadcrumb.crumbs} current={breadcrumb.current} />
      <Avatars size={'large'} authors={authors} />
      <footer className={styles.footer}>
        <p>
          Thanks for taking the time to read my drivel. <br />
          Matthew 😊
        </p>
      </footer>
    </div>
  );
};
