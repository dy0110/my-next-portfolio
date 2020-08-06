import axios, { AxiosResponse } from 'axios'
import { ModelProfile } from './type'

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
