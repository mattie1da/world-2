import { remark } from 'remark'
import html from 'remark-html'
import { remarkHeadingId } from 'remark-custom-heading-id';
import { fetchAPI } from './api';
import { estimateReadTime } from '../helpers/estimateReadTime'
import { getPlaiceholder } from 'plaiceholder'

const resolveBlogData = (data, content) => {
   const { authors, description, title, image, category, publishedAt } = data.attributes;

   return {
      authors: authors.data.map(author => {
         const { name, picture } = author.attributes;

         return {
            name: name,
            picture: {
               alt: picture.data.attributes.alternativeText,
               url: picture.data.attributes.url,
            }
         }
      }),
      content: content ? data.attributes.content : null,
      description: description,
      id: data.id,
      image: {
         alt: image.data.attributes.alternativeText,
         url: image.data.attributes.url,
         plaiceholder: image.data.attributes.plaiceholder ? image.data.attributes.plaiceholder : null
      },
      tag: category.data.attributes.name,
      title: title,
      publishedAt: publishedAt
   }
}

export const getBlogs = async (ids) => {
   if (ids) {
      return await Promise.all(ids.map(id => getBlog(id)))
   } else {
      let blogData = await fetchAPI("/articles", {
         populate: {
            category: "*",
            image: "*",
            authors: {
               populate: {
                  picture: "*"
               }
            }
         },
      });

      await Promise.all(blogData.data.map((blog, index) => {
         const appendPlaiceholders = async () => {
            const { base64 } = await getPlaiceholder(blog.attributes.image.data.attributes.url);
            blogData.data[index].attributes.image.data.attributes = {...blogData.data[index].attributes.image.data.attributes, plaiceholder: base64}
         }

         return appendPlaiceholders();
      }))

      const refinedData = blogData.data.map(blog => resolveBlogData(blog));
      const sortedData = refinedData.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
      
      return sortedData;
   }

}

export const getBlog = async (id, content) => {
   let blogData = await fetchAPI(`/articles/${id}`, {
      populate: {
         category: "*",
         image: "*",
         authors: {
            populate: {
               picture: "*"
            }
         }
      },
   });

   const { base64 } = await getPlaiceholder(blogData.data.attributes.image.data.attributes.url);
   blogData.data.attributes.image.data.attributes = {...blogData.data.attributes.image.data.attributes, plaiceholder: base64}

   const refinedData = resolveBlogData(blogData.data, content)
   
   if (content) {
      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
      .use(remarkHeadingId)
      .use(html)
      .process(blogData.data.attributes.content)
      
      const contentHtml = processedContent.toString()
      
      refinedData['content'] = contentHtml;
      refinedData['readTime'] = estimateReadTime(blogData.data.attributes.content)
   }

   return refinedData;
}

export const getAllBlogIDs = async () => {
   const allBlogs = await getBlogs();

   return allBlogs.map(Blog => {
      return {
         params: {
            id: Blog.id.toString()
         }
      }
  })
}

export const getAllBlogTags = async () => {
   const allBlogTagsData = await fetchAPI("/categories");

   return allBlogTagsData.data.map(tag => tag.attributes.name);
}