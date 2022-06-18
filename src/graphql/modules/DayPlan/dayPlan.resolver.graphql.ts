//types
import { TokenDecoded } from '../../../types/auth';
import { SpotOfInterest } from '../../../types/trip.types';

// TODO: WRITE TYPES
export default {
  Query: {
    getDayPlan: async (
      _: unknown,
      args: { dayPlanId: string },
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: any }
    ) => {
      const { dayPlanId } = args;
      return await dataSources.dayPlans.getDayPlan(dayPlanId);
    },
  },
  Mutation: {
    appendSpotOfInterest: (
      _: unknown,
      args: {
        dayPlanId: string;
        spotOfInterest: SpotOfInterest;
      }
    ) => {
      return {};
    },
  },
};
