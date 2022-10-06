// setup
import Head from 'next/head'
import Link from 'next/link'
import { Highlight } from '../components'
import { Container, Hero, Layout } from '../components/layout'

// components
export default function PageNotFound() {
  return (
    <Layout>
      <Head>
        <title>Where you off to?</title>
        <meta
          name="description"
          content="Not sure about that one, chief!"
        />
        <meta property="og:image" content="/images/projects/world.png" />
        <meta property="og:image:type" content="image/png" />
      </Head>
      <Hero title={<>Sorry mate, <Highlight text="404" />; <br/>I couldn't find that!</>}/>
    </Layout>
  )
}