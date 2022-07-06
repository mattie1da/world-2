import Head from 'next/head';
import { GlobalStateContext } from '../../context/themePreferencesContext';
import React, { useContext } from 'react';

import { Navigation, Footer } from '../layout';
import { Theme } from '../';
import { Container } from './container';

interface LayoutInterface {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutInterface) => {
  const { state } = useContext(GlobalStateContext);

  return (
    <Theme state={state}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta
          name="description"
          content="An experienced web designer and developer based in Hampshire, England."
        />

        <meta property="og:image" content="/images/projects/world.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />

        <meta name="og:title" content="Matthew Wyatt, Developer" />
        <meta
          name="og:description"
          content="An experienced web designer and developer based in Hampshire, England."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <header>
          <Navigation />
        </header>
      </Container>
      <main style={{ contain: 'paint' }}>{children}</main>
      <Footer />
    </Theme>
  );
};
