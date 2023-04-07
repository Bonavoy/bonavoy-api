import { RESTDataSource } from '@apollo/datasource-rest'

export default class MapboxAPI extends RESTDataSource {
  private accessToken: string

  constructor() {
    super()
    this.baseURL = `https://api.mapbox.com`
    this.accessToken = process.env.MAPBOX_ACCESS_TOKEN!
  }

  getLocationSuggestions = async (query: string) => {
    const locationSuggestions = await this.get(
      `/geocoding/v5/mapbox.places/${query}.json?access_token=${this.accessToken}&limit=5`,
    )

    return JSON.parse(locationSuggestions).features // WHY IS THIS A STRING
  }
}
