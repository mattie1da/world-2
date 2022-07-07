import styles from '../../styles/layout/footer.module.css';

import { Container } from '.';
import { Socials } from '../partials';
import { GlobalLink } from '../';

export const Footer = () => {
  return (
    <Container>
      <footer className={styles.wrapper}>
        <div className={styles.signature}>
          <p>Design & build by me 💕</p>
          <GlobalLink text="Read the process" url="/diary/5" />
        </div>
        <div className={styles.signature}>
          <p>Send me a message&nbsp;&nbsp;🐝</p>
          <GlobalLink
            text="hello@mattie.world"
            url="mailto:hello@mattie.world"
          />
        </div>
        <nav>
          <Socials />
        </nav>
      </footer>
    </Container>
  );
};
