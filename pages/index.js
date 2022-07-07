// setup
import Head from 'next/head'
import classnames from 'classnames'
import { getBlogs } from '../lib/blog'
import { getGlobalSettings } from '../lib/global'
import { getVillagers } from '../lib/villagers'

// styles
import utilStyles from '../styles/utils.module.css'

// components
import { Layout, Hero, Widgets, SplitContent, Container } from '../components/layout'
import { Palette, Highlight, List, Article, GlobalLink, Quote, BlobThree, BlobFive, BlobSix, BlobSeven, BlobOne, BlobTwo } from '../components'
import { Companies, ShowcaseWidgetPair } from '../components/partials' 

// types

export default function Home({ featuredBlogsData, globalSettingsData, villagersData }) {
  return (
    <Layout home>
      <Head>
        <title>{globalSettingsData.siteName} - Developer</title>
        <meta
          name="description"
          content={globalSettingsData.defaultSeo.metaDescription}
        />
      </Head>
      <BlobOne />
      <BlobThree />
      <Hero
        home
        title={
          <>
            Hello! I'm <Highlight text="Matthew Wyatt" />; <br/><span className={utilStyles.textSmoke}>a </span>
            web designer & developer <span className={utilStyles.textSmoke}>based in</span> Hampshire, England &darr;
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
            preTitle: "lower back pain",
            title: <>I design, <Highlight text="build" /> <span className={utilStyles.textSmoke}>and maintain</span> websites and apps 📱🖥⚡️</>
          }}
          content={
            <ShowcaseWidgetPair villagersData={villagersData} featuredBlog={featuredBlogsData[1]} />
          }
        />
      </Container>
      <SplitContent />
      <BlobSeven />
      <BlobTwo />
      <Container thin>
        <Article 
          title={{
            title: <><span className={utilStyles.textSmoke}>Currently:</span> <Highlight text="Available"/><br/>for contract roles 🧸✨</>,
            preTitle: "my skillset & tech stack"
          }}
          content={
            <>
              <List items={[
                {
                  title: 'Animation',
                  description: <>Barba, GSAP, React Transition</>
                },
                {
                  title: 'CMS',
                  description: <>Kentico, Strapi<span className={utilStyles.textSmoke}>, Umbraco, Wordpress</span></>
                },
                {
                  title: 'CSS',
                  description: <>BEM, Modules, SCSS, Tailwind, Variables</>
                },
                {
                  title: 'Database',
                  description: <>MySQL, Postgre</>
                },
                {
                  title: 'Design',
                  description: <>Adobe XD, Figma, Sketch</>
                },
                {
                  title: 'E-commerce',
                  description: <>Shopify, Polaris, <span className={utilStyles.textSmoke}>WooCommerce</span></>
                },
                {
                  title: 'HTML',
                  description: <>Yes</>
                },
                {
                  title: 'Javascript',
                  description: <>ES6, <strong>Typescript</strong>, <strong>React</strong> x Next, <strong>Vue</strong> x Nuxt</>
                },
                {
                  title: 'Misc.',
                  description: <>Agile, Bitbucket, Git, Jira, Miro, Trello</>
                }
              ]} />
              <div>
                <div className={classnames(utilStyles.grid, utilStyles.gridThin)}>
                  <div className={classnames(utilStyles.articleBody, utilStyles.articleBodyLarge)}>
                    <h3>Get in touch</h3>
                    <p>
                      I’ve worked in a variety of environments, ranging from ambitious <strong>start-ups</strong> to well established <strong>products</strong> and <strong>agencies</strong>.
                      On the way, I’ve been lucky enough to work with some <strong>stellar</strong> people - some of which remain my closest friends today. 😋
                    </p>
                    <p>
                      Because of this, I prefer the <strong>comradery</strong> and <strike>banter</strike> social aspect involved when <strong>working in a team</strong>. 
                      I tend to gravitate towards those types of roles.
                    </p>
                    <GlobalLink text="hello@mattie.world" url="mailto:hello@mattie.world" />
                    <Companies />
                  </div>
                  <div>
                    <Quote 
                      text="I was constantly impressed by Matt's excitement for the role. 
                        He has a great eye for design which became super useful when deadlines were tight.
                        He was able to mock up designs and then translate them into clean semantic markup. 
                        Above all, Matt is a great guy who I'm now fortunate enough to call a friend." 
                      author="Gaz - Director @ Sneek Digital, Farnham"
                    />

                    <Quote 
                      text="
                        Matteo is a joy to work with; he cares a lot about the quality of his craft and his character always shines
                        in the work place. He makes work fun and exciting. Gracias por todo, amigo!" 
                      author="Maxi - Developer @ Go App Studio, Shopify"
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
  )
}

export async function getStaticProps() {
  const featuredBlogsData = await getBlogs([6, 5]);
  const globalSettingsData = await getGlobalSettings();
  const villagersData = await getVillagers();

  return {
    props: {
      featuredBlogsData,
      globalSettingsData,
      villagersData
    }
  }
}
