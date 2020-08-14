import axios, { AxiosResponse } from 'axios'
import { ModelProfile, ModelContents, ModelPost } from './type'

const X_API_KEY: string = process.env.X_API_KEY || ''

const instance = axios.create({
  baseURL: 'https://dy01110ym.microcms.io/api/v1',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
    'X-API-KEY': X_API_KEY,
  },
})

export const getProfile = async (): Promise<AxiosResponse<ModelProfile>> => {
  const Response = await instance.get<ModelProfile>('/profile/ueanzvkhbf')

  return Response
}

export const getBlogList = async (
  page: number,
  tag?: string
): Promise<AxiosResponse<ModelContents>> => {
  const offset = page === 1 ? 0 : (page - 1) * 10 + 1
  const filters = tag ? `&filters=tag[contains]${encodeURI(tag)}` : ''

  const Response = await instance.get<ModelContents>(
    `/posts?fields=id,title,tag,createdAt,updatedAt&limit=11&offset=${offset}${filters}`
  )

  return Response
}

export const getBlogPost = async (
  id: string
): Promise<AxiosResponse<ModelPost>> => {
  const Response = await instance.get<ModelPost>(`/posts/${id}`)

  return Response
}

export const getPreviewBlogPost = async (
  id: string,
  draftKey: string
): Promise<AxiosResponse<ModelPost>> => {
  const Response = await instance.get<ModelPost>(
    `/posts/${id}?draftKey=${draftKey}`
  )

  return Response
}
