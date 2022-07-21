import { Request, Response, RESTDataSource } from 'apollo-datasource-rest'

export interface VenueRecommendationParams {
  coords: { lat: number; lng: number }
  pageSize: number
  cursor?: string
}
export default class FoursquareAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `https://api.foursquare.com/v3`
  }

  willSendRequest(request: any) {
    request.headers.set('Authorization', process.env.FOURSQUARE_API_KEY)
  }

  async didReceiveResponse(response: Response, _: Request): Promise<any> {
    const nextCursorLink = await response.headers.get('Link')
    const body = await response.json()
    return { body, nextCursorLink }
  }

  getVenueRecommendations = async (venueRecommendationParams: VenueRecommendationParams) => {
    const { coords, pageSize, cursor } = venueRecommendationParams
    let cursorParam = ''
    if (cursor) {
      cursorParam = `&cursor=${cursor}`
    }
    const { body, nextCursorLink } = await this.get(
      `/places/search?ll=${coords.lat},${coords.lng}&limit=${pageSize}${cursorParam}`,
    )
    return {
      venues: this.format(body.results),
      cursor: this.parseHeaderLink(nextCursorLink),
    }
  }

  parseHeaderLink = (headerLink: string) => {
    const link = headerLink.split(';')[0]
    const formattedLink = link.replace('<', '').replace('>', '').replace('%2C', ',')
    return new URLSearchParams(formattedLink).get('cursor')
  }

  format = (spotData: Array<any>) => {
    return spotData.map((spot) => ({
      fsq_id: spot.fsq_id,
      name: spot.name,
      coords: {
        lng: spot.geocodes.main.longitude,
        lat: spot.geocodes.main.latitude,
      },
      category: spot.categories.at(0)?.name ?? '', // default to no name
    }))
  }
}
