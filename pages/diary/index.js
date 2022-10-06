import { BlobSeven, BlobFour, BlobTwo } from '../../components'
import Head from 'next/head'
import { getAllBlogTags, getBlogs } from '../../lib/blog'
import { getGlobalSettings } from '../../lib/global'

// styles
import utilStyles from '../../styles/utils.module.css'

// components
import { Layout, Hero, Container } from '../../components/layout'
import { BlogList } from '../../components/blog'

export default function Blogs({ allBlogsData, globalSettingsData, tagsData }) {
  return (
    <Layout>
      <Head>
        <title>{globalSettingsData.siteName} - Diary</title>
        <meta
          name="description"
          content="A collection of diary entries covering a variety of topics - not just specific to web development."
        />

        <meta name="og:title" content="Matthew Wyatt, Diary" />
        <meta name="og:description" content="A collection of diary entries covering a variety of topics - not just specific to web development." />
        <meta property="og:image" content="/images/projects/world.png" />
        <meta property="og:image:type" content="image/png" />
      </Head>
      <BlobTwo />
      <BlobSeven />

      <Hero 
        title="Diary 🌍"
        lead={
          <>
            Not only is this a space for reinstating and solidifying new knowledge in the web development world - 
            it's a space to reflect on lessons and adventures in the real world too. I cherish
            my time away from the keyboard - <strong>there's more to life than sitting at your desk all day! 🐥</strong>
          </>
        }
        withMeta={{
          tags: tagsData,
        }} 
      />
      <BlobFour />
      
      <Container>
        <h2 className={utilStyles.visuallyHidden}>Entries:</h2>
        <BlogList allBlogsData={allBlogsData} />
      </Container>

    </Layout>
  )
}

export async function getStaticProps() {
  const allBlogsData = await getBlogs();
  const globalSettingsData = await getGlobalSettings();
  const tagsData = await getAllBlogTags();

  return {
    props: {
      allBlogsData,
      globalSettingsData,
      tagsData
    }
  }
}
