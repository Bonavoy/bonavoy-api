//types
import { DayPlan } from '@prisma/client'
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'

// TODO: WRITE TYPES
export default {
  Query: {
    getDayPlanByDate: async (
      _: unknown,
      args: { tripId: string; date: Date },
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      const { tripId, date } = args
      return await dataSources.dayPlans.findDayPlan({ date, tripId })
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
