import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { getAllBlogIDs, getBlog } from '../../lib/blog'
import classnames from 'classnames'

import utilStyles from '../../styles/utils.module.css'

import { Layout, Hero, Container } from '../../components/layout'
import { BlogText, BlogSignature, BlogNavigation} from '../../components/blog'
import { BlobFive, BlobOne, BlobSix } from '../../components'

export default function Post({ blogData }) {
  const [progress, setProgress] = useState(0);
  const blogRef = useRef(null);

  useEffect(() => {
    const calculateProgress = () => {
      if (blogRef.current) {
        const blogRefRect = blogRef.current.getBoundingClientRect();
  
        const distanceFromBlogRefToTop = blogRefRect.top;
  
        const blogRefHeight = blogRefRect.height;
            
        let calculateScrollProgressOnBlogRef = Math.round(`${((distanceFromBlogRefToTop - 600) / (blogRefHeight - 100)) * 100}`);
  
        if (calculateScrollProgressOnBlogRef > 0) {
          calculateScrollProgressOnBlogRef = 0
        } else if (calculateScrollProgressOnBlogRef < -100) {
          calculateScrollProgressOnBlogRef = 100
        }
  
        setProgress(Math.abs(calculateScrollProgressOnBlogRef));
      }
    }

    document.addEventListener("scroll", calculateProgress);
    return () => document.removeEventListener("scroll", calculateProgress);
  }, [])

  return (
    <Layout>
      <Head>
        <title>{blogData.title}</title>
        <meta
          name="description"
          content={blogData.description}
        />

        <meta name="og:title" content={blogData.title} />
        <meta name="og:description" content={blogData.description} />
        <meta property="og:image" content={blogData.image.url} />
        <meta property="og:image:type" content="image/jpg" />
        <meta name="author" content="Matthew Wyatt" />
      
      </Head>
      <article>
        <Hero 
          breadcrumb={{
            crumbs: [
              {
                text: 'Home',
                href: '/',
              },
              {
                text: 'Diary',
                href: '/diary',
              },
            ],
            current: blogData.title
          }}
          image={blogData.image}
          title={blogData.title} 
          withMeta={{
            authors: blogData.authors,
            date: blogData.publishedAt,
            tags: [ blogData.tag ],
            readTime: blogData.readTime
          }}
        />
        <BlobOne />
        <BlobFive />
        <Container thin>
          <div className={classnames(utilStyles.grid, utilStyles.gridBlog)} ref={blogRef}>
            <BlogText content={blogData.content} />
            <BlogNavigation progress={progress} />
          </div>
        </Container>
        <Container>
          <BlogSignature authors={blogData.authors} breadcrumb={
            {
              crumbs: [
                {
                  text: 'Home',
                  href: '/',
                },
                {
                  text: 'Diary',
                  href: '/diary',
                },
              ],
              current: blogData.title
            }
          }/>
          <BlobSix />
        </Container>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllBlogIDs();

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const blogData = await getBlog(params.id, true)

  return {
    props: {
      blogData,
    }
  }
}
