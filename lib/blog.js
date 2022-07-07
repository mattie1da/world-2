import { remark } from 'remark'
import html from 'remark-html'
import { remarkHeadingId } from 'remark-custom-heading-id';
import { fetchAPI } from './api';
import { estimateReadTime } from '../helpers/estimateReadTime'

const resolveBlogData = (data, content) => {
   const { authors, description, title, image, category, publishedAt } = data.attributes;

   return {
      authors: authors.data.map(author => {
         const { name, picture } = author.attributes;

         return {
            name: name,
            picture: {
               alt: picture.data.attributes.alternativeText,
               url: picture.data.attributes.url
            }
         }
      }),
      content: content ? data.attributes.content : null,
      description: description,
      id: data.id,
      image: {
         alt: image.data.attributes.alternativeText,
         url: image.data.attributes.url
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
      const blogData = await fetchAPI("/articles", {
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

      const refinedData = blogData.data.map(blog => resolveBlogData(blog));
      const sortedData = refinedData.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
      
      return sortedData;
   }

}

export const getBlog = async (id, content) => {
   const blogData = await fetchAPI(`/articles/${id}`, {
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