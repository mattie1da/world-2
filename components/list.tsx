import styles from '../styles/list.module.css';
import { useEffect, useRef } from 'react';
import { listItemReveal } from './animations/listItemReveal';

interface ItemInterface {
  title: string;
  description: string;
}

interface ListInterface {
  items: Array<ItemInterface>;
}

export const List = ({ items }: ListInterface) => {
  // @ts-ignore
  const listItemsRef = useRef([]);

  useEffect(() => {
    listItemReveal(listItemsRef.current);
  }, []);

  return (
    <dl className={styles.list}>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (listItemsRef.current[index] = el)}
          className={styles.item}
        >
          <dt key={index} className={styles.title}>
            {item.title}
          </dt>
          <dd className={styles.description}>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
};
