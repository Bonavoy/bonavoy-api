import { RESTDataSource } from '@apollo/datasource-rest'
import { InputCoords } from '@bonavoy/generated/graphql'

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

    return JSON.parse(locationSuggestions).features // WHY IS THIS A STRING MAPBOX
  }

  getRoute = async (coords: InputCoords[]) => {
    const coordList = coords.map((coord) => `${coord.lng},${coord.lat}`)
    const coordString = coordList.join(';')
    return await this.get(
      `/directions/v5/mapbox/driving/${coordString}?access_token=${this.accessToken}&geometries=geojson`,
    )
  }
}
