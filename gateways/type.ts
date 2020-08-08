export interface ModelProfile {
  Interest: string
  Introduction: string
  birthday: string
  createdAt: string
  from: string
  id: string
  image: {
    url: string
  }
  name: string
  publishedAt: string
  skills: string
  updatedAt: string
}

export interface ModelContent {
  id: string
  title: string
  tag?: string
  createdAt: string
  updatedAt: string
}

export interface ModelContents {
  contents: ModelContent[]
  limit: number
  offset: number
  totalCount: number
}

export interface ModelPost extends ModelContent {
  content: string
}
