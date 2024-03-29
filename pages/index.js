// setup
import Head from 'next/head';
import classnames from 'classnames';
import { getBlogs } from '../lib/blog';
import { getGlobalSettings } from '../lib/global';
import { getVillagers } from '../lib/villagers';

// styles
import utilStyles from '../styles/utils.module.css';

// components
import {
  Layout,
  Hero,
  Widgets,
  SplitContent,
  Container,
  SectionHeading
} from '../components/layout';
import {
  Palette,
  Highlight,
  List,
  Article,
  GlobalLink,
  Quote,
  BlobThree,
  BlobFive,
  BlobSix,
  BlobSeven,
  BlobOne,
  BlobTwo
} from '../components';
import { Companies, ShowcaseWidgetPair } from '../components/partials';
import { useContext, useEffect, useState } from 'react';
import { randomItem } from '../helpers/randomItem';
import { GlobalStateContext } from '../context/themePreferencesContext';
import { emojis } from '../lib/emojis';

export default function Home({ featuredBlogsData, globalSettingsData }) {
  const [villagersData, setVillagersData] = useState(null);
  const { state } = useContext(GlobalStateContext);
  const [emoji, setEmoji] = useState(null);

  const getVillagersData = async () => {
    const data = await getVillagers();
    setVillagersData(data);
  };

  useEffect(() => {
    getVillagersData();
  }, []);

  useEffect(() => {
    setEmoji(randomItem(emojis));
  }, [state.color]);

  return (
    <Layout home>
      <Head>
        <title>{globalSettingsData.siteName} - Developer</title>
        <meta
          name="description"
          content={globalSettingsData.defaultSeo.metaDescription}
        />
        <meta property="og:image" content="/images/projects/world.png" />
        <meta property="og:image:type" content="image/png" />
      </Head>
      <BlobOne />
      <BlobThree />
      <Hero
        home
        title={
          <>
            Hello! I'm <Highlight text="Matthew Wyatt" />; <br />
            <span className={utilStyles.textSmoke}>a </span>
            freelance web developer{' '}
            <span className={utilStyles.emoji}>{emoji}</span>
            <span className={utilStyles.desktopOnly}>
              <span className={utilStyles.textSmoke}> based in</span> Hampshire,
              England
              <span className={utilStyles.textSmoke}>&darr;</span>
            </span>
          </>
        }
      />
      <Palette />
      <BlobSeven />
      <Widgets featuredArticle={featuredBlogsData[0]} />
      <BlobFive />
      <BlobSix />
      <Container thin>
        <Article
          title={{
            preTitle: 'lower back pain',
            title: (
              <>
                I design, <Highlight text="build" />{' '}
                <span className={utilStyles.textSmoke}>and maintain</span>{' '}
                websites and apps 📱🖥⚡️
              </>
            )
          }}
          content={
            villagersData && (
              <ShowcaseWidgetPair
                villagersData={villagersData}
                featuredBlog={featuredBlogsData[1]}
              />
            )
          }
        />
      </Container>
      <SplitContent />
      <BlobSeven />
      <BlobTwo />
      <Container thin>
        <Article
          title={{
            title: <>What I work with:</>
          }}
          content={
            <>
              <List
                items={[
                  {
                    title: 'Animation',
                    description: <>Barba, GSAP, React Transition</>
                  },
                  {
                    title: 'CMS',
                    description: (
                      <>
                        Kentico, Strapi
                        <span className={utilStyles.textSmoke}>
                          , Umbraco, Wordpress
                        </span>
                      </>
                    )
                  },
                  {
                    title: 'CSS',
                    description: <>BEM, Modules, SCSS, Tailwind, Variables</>
                  },
                  {
                    title: 'Database',
                    description: <>MySQL, Postgres</>
                  },
                  {
                    title: 'Design',
                    description: <>Adobe XD, Figma, Sketch</>
                  },
                  {
                    title: 'E-commerce',
                    description: (
                      <>
                        Shopify, Polaris,{' '}
                        <span className={utilStyles.textSmoke}>
                          WooCommerce
                        </span>
                      </>
                    )
                  },
                  {
                    title: 'HTML',
                    description: <>Yes</>
                  },
                  {
                    title: 'Javascript',
                    description: (
                      <>
                        ES6, <strong>Typescript</strong>, <strong>React</strong>{' '}
                        x Next, <strong>Vue</strong> x Nuxt
                      </>
                    )
                  },
                  {
                    title: 'Misc.',
                    description: <>Agile, Bitbucket, Git, Jira, Miro, Trello</>
                  }
                ]}
              />
              <div>
                <div
                  className={classnames(utilStyles.grid, utilStyles.gridThin)}
                >
                  <div
                    className={classnames(
                      utilStyles.articleBody,
                      utilStyles.articleBodyLarge
                    )}
                  >
                    <h3>Get in touch</h3>
                    <p>
                      I’ve worked in a variety of environments, ranging from
                      ambitious <strong>start-ups</strong> to well established{' '}
                      <strong>products</strong> and <strong>agencies</strong>.
                      On the way, I’ve been lucky enough to work with some{' '}
                      <strong>stellar</strong> people - some of which remain my
                      closest friends today. 😋
                    </p>
                    <p>
                      Because of this, I prefer the <strong>comradery</strong>{' '}
                      and <strike>banter</strike> social aspect involved when{' '}
                      <strong>working in a team</strong>. I tend to gravitate
                      towards those types of roles.
                    </p>
                    <GlobalLink
                      text="hello@mattie.world"
                      url="mailto:hello@mattie.world"
                    />
                    <Companies />
                  </div>
                  <div>
                    <Quote
                      text="
                        Matteo is a joy to work with. He cares about the quality of his craft and his character brightens up
                        the work place. Gracias por todo, amigo!"
                      author="Maxi - Developer @ Go App Studio, Shopify"
                    />

                    <Quote
                      text="Matt has a great eye for design which became useful when deadlines were tight.
                        He was able to mock up designs and translate them into clean semantic markup. 
                        Above all, Matt is a great guy who I'm now fortunate enough to call a friend."
                      author="Gaz - Director @ Sneek Digital, Farnham"
                    />

                    <Quote
                      text="Matt is excellent from start to finish. He elevates every design he touches, bringing expertise in thoughtful user experience as well as considered visual touches. Supremely easy to talk to, responsive and just an absolute pleasure to work with."
                      author="Beth - Graphic Designer"
                    />
                  </div>
                </div>
              </div>
            </>
          }
        />
      </Container>

      {/* <Container thin dark>
        <Article 
          title={{
            preTitle: "lowering my screen time",
            title: "Personal 🪴"
          }}
          content={
            <>
              <div className={classnames(utilStyles.articleBody, utilStyles.articleBodyLarge)}>
                <p>
                  I absolutely love the outdoors. When not at my computer, I'm usually <strong>running</strong> <span className={utilStyles.textSmoke}>(slowly)</span> 
                  , <strong>skateboarding</strong> <span className={utilStyles.textSmoke}>(badly)</span> or getting lost somewhere on my motorbike.
                </p>
                <p>
                  I love creating videos, be it filming an adventure with a <strong>GoPro</strong> and my <strong>phone</strong> or my friends skating 
                  with my <strong>vx1000</strong>. I love documenting stuff! <span className={utilStyles.textSmoke}>I got it from my momma 😎</span>
                </p>
                <p>In the winter months, I'm partial to a bit of gaming; <strong>Skyrim</strong>, <strong>Zelda</strong> or <strong>Animal Crossing</strong> to name a few.</p>
              </div>
            </>
          }
        />
        <Collage />
      </Container> */}
      <BlobFive />
    </Layout>
  );
}

export async function getStaticProps() {
  const featuredBlogsData = await getBlogs([9, 5]);
  const globalSettingsData = await getGlobalSettings();
  const villagersData = await getVillagers();

  return {
    props: {
      featuredBlogsData,
      globalSettingsData,
      villagersData
    }
  };
}
