//types
import { DayPlan } from '@prisma/client'
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'

// TODO: WRITE TYPES
export default {
  Query: {
    getDayPlanByDate: async (
      _: unknown,
      args: { placeId: string; date: string },
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      const { placeId, date } = args
      return await dataSources.dayPlans.findDayPlanByDate(placeId, date)
    },
  },
  Mutation: {
    createDayPlan: async (
      _: unknown,
      args: {
        dayPlan: DayPlan
      },
      { dataSources }: { dataSources: BonavoyDataSources },
    ) => {
      const { dayPlan } = args
      return await dataSources.dayPlans.createDayPlan(dayPlan)
    },
  },
}
