import { AuthorInterface, ImageInterface } from './'

export interface BlogItemInterface {
  authors: Array<AuthorInterface>,
  description: string,
  id: Number,
  image: ImageInterface;
  tag: string,
  title: string,
  publishedAt: string,
  url: string,
}