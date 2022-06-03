import { RESTDataSource } from 'apollo-datasource-rest';

export default class FoursquareAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.foursquare.com/v3';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', process.env.FOURSQUARE_API_KEY);
  }

  async getSpotsOfInterest(options) {
    const { coords, limit } = options;
    const { results } = await this.get(
      `/places/search?ll=${coords.lat},${coords.lng}&limit=${limit}`
    );
    return this.formatToGraphQLSchema(results);
  }

  async getSpotsOfInterestPhotoes(options) {}

  /**
   * format data from API to match our schema
   * @param {SpotOfInterest} res
   * @returns formatted list of spot of interest's
   */
  formatToGraphQLSchema(res) {
    return res.map((spot) => ({
      fsq_id: spot.fsq_id,
      name: spot.name,
      distance: spot.distance,
      coords: {
        lat: spot.geocodes.main.latitude,
        lng: spot.geocodes.main.longitude,
      },
    }));
  }
}
