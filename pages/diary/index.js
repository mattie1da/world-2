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
      </Head>
      <BlobTwo />
      <BlobSeven />

      <Hero 
        title="Diary"
        lead={
          <>
            Documenting my thoughts, reflections and lessons learnt
            on my travels and experiences; standing as a way of solidifying new knowledge and improving my god awful writing skills.
            <br/><br/>Sometimes dev related, sometimes any old rubbish..
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
