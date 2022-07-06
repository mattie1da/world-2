import { useRouter } from 'next/router';
import styles from '../../styles/layout/navigation.module.css';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import classnames from 'classnames';

import { Socials } from '../partials';
import { Container } from './container';
import { GlobalLink } from '../globalLink';
import { BlueColor, PinkColor, ModeToggle } from '../colors';
import { useEffect, useState } from 'react';

export const Navigation = () => {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', updateScrollPosition);

    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, [typeof window !== 'undefined']);

  return (
    <nav
      className={classnames(styles.wrapper, {
        [styles.wrapperWhenScrolling]: scrollPosition !== 0
      })}
    >
      <Container>
        <div className={classnames(styles.grid)}>
          <div>
            <Link href="/">
              <a
                className={classnames(styles.link, {
                  [`${utilStyles.active} ${styles.active}`]:
                    router.pathname == '/'
                })}
              >
                Home
              </a>
            </Link>
            <Link href="/diary">
              <a
                className={classnames(styles.link, {
                  [`${utilStyles.active} ${styles.active}`]:
                    router.pathname == '/diary'
                })}
              >
                Diary
              </a>
            </Link>
            {router.pathname === '/diary/[id]' && (
              <span
                className={classnames(
                  styles.link,
                  utilStyles.active,
                  styles.active
                )}
              >
                🐛
              </span>
            )}
          </div>
          <div
            className={classnames(styles.colors, {
              [styles.colorsVisible]:
                router.pathname !== '/' || scrollPosition > 750
            })}
          >
            <PinkColor small button />
            <BlueColor small button />
            <ModeToggle />
          </div>
          <div className={styles.list}>
            <div className={styles.socials}>
              <GlobalLink
                text="hello@mattie.world"
                url="mailto:hello@mattie.world"
              />
              <Socials />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};
