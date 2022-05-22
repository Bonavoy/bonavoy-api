import { RESTDataSource } from 'apollo-datasource-rest';

export default class FoursquareAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.foursquare.com/v3';
  }

  async getSpotsOfInterest(coords) {
    this.get('/places/search');
  }
}
