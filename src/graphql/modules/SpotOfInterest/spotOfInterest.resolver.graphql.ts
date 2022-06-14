//types
import { TokenDecoded } from '../../../types/auth';
import { SpotOfInterest } from '../../../types/trip.types';

// TODO: WRITE TYPES
export default {
  Query: {
    getSpotOfInterestRecommendations: async (
      _: unknown,
      args: { input: { coords: { lat: number; lng: number }; limit: number } },
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: any }
    ) => {
      //WRITE TYPES
      const { input } = args;
      const options = {
        coords: input.coords,
        limit: input.limit,
      };
      const spotOfInterestRecommendations =
        await dataSources.foursquareAPI.getSpotsOfInterest(options);
      return spotOfInterestRecommendations;
    },
  },
  Mutation: {
    addSpotOfInterest: (
      _: unknown,
      args: {
        tripId: string;
        placeId: string;
        dayPlanId: string;
        spotOfInterest: SpotOfInterest;
      }
    ) => {
      //write TYPES
      console.log(args);
      return {};
    },
  },
};
