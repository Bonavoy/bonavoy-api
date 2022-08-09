import { Request, Response, RESTDataSource } from 'apollo-datasource-rest'
export interface SpotSuggestionParams {
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

  getSpotSuggestions = async (spotSuggestionParams: SpotSuggestionParams) => {
    const { coords, pageSize, cursor } = spotSuggestionParams
    let cursorParam = ''
    if (cursor) {
      cursorParam = `&cursor=${cursor}`
    }
    const { body, nextCursorLink } = await this.get(
      `/places/search?ll=${coords.lat},${coords.lng}&limit=${pageSize}${cursorParam}`,
    )
    const formattedSpotSuggestions = this.format(body.results)

    return {
      spotSuggestions: await this.getSpotSuggestionPhotos(formattedSpotSuggestions),
      cursor: this.parseHeaderLink(nextCursorLink),
    }
  }

  // mutates spot suggestion object
  getSpotSuggestionPhotos = async (spotSuggestions: Array<any>) => {
    const spotSuggestionPhotoPromises = spotSuggestions.map((spotSuggestion) =>
      this.getPhotoUrlComponents(spotSuggestion.fsq_id),
    )
    const spotSuggestionPhotos = await Promise.all(spotSuggestionPhotoPromises)
    return spotSuggestions.map((spotSuggestion, i) => {
      return {
        ...spotSuggestion,
        coords: { ...spotSuggestion.coords },
        ...spotSuggestionPhotos[i],
      }
    })
  }

  getPhotoUrlComponents = async (fsq_id: string) => {
    const { body } = await this.get(`/places/${fsq_id}/photos`)
    return { prefix: body.at(0)?.prefix, suffix: body.at(0)?.suffix }
  }

  parseHeaderLink = (headerLink: string) => {
    const link = headerLink.split(';')[0]
    const formattedLink = link.replace('<', '').replace('>', '').replace('%2C', ',')
    return new URLSearchParams(formattedLink).get('cursor')
  }

  format = (spotSuggestionData: Array<any>) => {
    return spotSuggestionData.map((spotSuggestion) => ({
      fsq_id: spotSuggestion.fsq_id,
      name: spotSuggestion.name,
      coords: {
        lng: spotSuggestion.geocodes.main.longitude,
        lat: spotSuggestion.geocodes.main.latitude,
      },
      category: spotSuggestion.categories.at(0)?.name ?? '', // default to no name
    }))
  }
}
