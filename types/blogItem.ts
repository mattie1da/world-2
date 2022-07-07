import { AuthorInterface } from './'

export interface BlogItemInterface {
  authors: Array<AuthorInterface>,
  description: string,
  id: Number,
  image: {
    alt: string,
    url: string,
    plaiceholder: string,
  },
  tag: string,
  title: string,
  publishedAt: string,
  url: string,
}