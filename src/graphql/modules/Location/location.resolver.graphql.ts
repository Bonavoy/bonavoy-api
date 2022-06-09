import axios from 'axios';

export default {
  Query: {
    getLocationSuggestions: async (
      _: unknown,
      {
        query,
        types,
        country,
        proximity,
      }: {
        query: string;
        types: string[];
        country: string[];
        proximity: number[];
      }
    ) => {
      try {
        // set query params
        const config = {
          params: {
            access_token: process.env.MAPBOX_ACCESS_TOKEN,
            types: types.join(','),
            country: country.join(','),
            proximity: proximity.join(','),
          },
        };

        return (
          await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
            config
          )
        ).data.features;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {},
};
