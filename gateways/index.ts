import axios, { AxiosResponse } from 'axios'
import { ModelProfile, ModelContents } from './type'

const X_API_KEY: string = process.env.X_API_KEY || ''

export const getProfile = async (): Promise<AxiosResponse<ModelProfile>> => {
  const Response = await axios.get(
    'https://dy01110ym.microcms.io/api/v1/profile/ueanzvkhbf',
    {
      headers: {
        'Content-type': 'application/json',
        'X-API-KEY': X_API_KEY,
      },
    }
  )

  return Response
}

export const getBlogList = async (
  page: number,
  tag?: string
): Promise<AxiosResponse<ModelContents>> => {
  const offset = page === 1 ? 0 : (page - 1) * 10 + 1
  const filters = tag ? `&filters=tag[contains]${tag}` : ''
  console.log('tag', tag)
  console.log('filters', filters)
  console.log(
    'url',
    `https://dy01110ym.microcms.io/api/v1/posts?fields=id,title,tag,createdAt,updatedAt&limit=11&offset=${offset}${filters}`
  )

  const Response = await axios.get(
    `https://dy01110ym.microcms.io/api/v1/posts?fields=id,title,tag,createdAt,updatedAt&limit=11&offset=${offset}${filters}`,
    {
      headers: {
        'Content-type': 'application/json',
        'X-API-KEY': X_API_KEY,
      },
    }
  )

  return Response
}
