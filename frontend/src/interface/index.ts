export interface Article {
  id: number
  sourceId: string
  sourceName: string
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface User {
  name?: string
  email: string
  password: string
  passwordConfirmation?: string
}
