import { Request, Response, RESTDataSource, RequestOptions } from 'apollo-datasource-rest'

export default class UnsplashAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `https://api.unsplash.com`
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Accept-Version', 'v1')
    request.headers.set('Authorization', 'Client-ID ' + process.env.UNSPLASH_API_KEY!)
  }

  getTripBannerPhoto = async (query: string) => {
    return (await this.get(`/search/photos?query=${query}&per_page=1&orientation=landscape`)).results[0]
  }
}
