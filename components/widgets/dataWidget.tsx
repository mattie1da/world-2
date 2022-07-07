import { useEffect, useState } from 'react';
import classnames from 'classnames';

import styles from '../../styles/widgets/dataWidget.module.css';
import utilStyles from '../../styles/utils.module.css';

export const DataWidget = ({
  title,
  button,
  description,
  data,
  image,
  footer
}) => {
  const renderDataItem = (item, index) => {
    return (
      <div key={index} className={styles.dataItem}>
        <dt className={styles.dataTitle}>{item.title}</dt>
        <dd className={styles.dataDescription}>{item.description}</dd>
      </div>
    );
  };

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={classnames(utilStyles.fontCute, styles.description)}>{description}</p>
      </header>
      <div className={styles.image}>{image}</div>
      {button && <div className={styles.button}>{button}</div>}
      <figcaption className={styles.wrapper}>
        <dl className={styles.data}>
          {data.map((item, index) => {
            return renderDataItem(item, index);
          })}
        </dl>
      </figcaption>
      <footer className={styles.footer}>{footer}</footer>
    </>
  );
};
