import axios from 'axios';

const queries = {
  getLocationSuggestions: async (_, { query, types, country, proximity }) => {
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
};

const mutations = {};

export const resolvers = { queries, mutations };