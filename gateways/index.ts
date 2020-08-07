import axios, { AxiosResponse } from 'axios'
import { ModelProfile, ModelContents } from './type'

const X_API_KEY: string = process.env.X_API_KEY || ''

export const getProfile = (): Promise<AxiosResponse<ModelProfile>> => {
  const Response = axios.get(
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

export const getBlogList = (
  page: number
): Promise<AxiosResponse<ModelContents>> => {
  const limit = page * 10 + 1
  const offset = page === 1 ? 0 : (page - 1) * 10

  const Response = axios.get(
    `https://dy01110ym.microcms.io/api/v1/posts?fields=id,title,tag,createdAt,updatedAt&limit=${limit}&offset=${offset}`,
    {
      headers: {
        'Content-type': 'application/json',
        'X-API-KEY': X_API_KEY,
      },
    }
  )

  return Response
}
