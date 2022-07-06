import Link from 'next/link';
import React from 'react';
import styles from '../../styles/layout/breadcrumb.module.css';

import { BreadcrumbInterface } from '../../types';

export const Breadcrumb = ({ crumbs, current }: BreadcrumbInterface) => {
  return (
    <div className={styles.wrapper}>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <Link key={index} href={crumb.href}>
            {crumb.text}
          </Link>
          <span className={styles.arrow}>&rarr;</span>
        </React.Fragment>
      ))}
      <span className={styles.current}>{current}</span>
    </div>
  );
};
