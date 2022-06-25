//types
import { TokenDecoded } from '../../../types/auth'
import { Trip } from '@prisma/client'
import { BonavoyDataSources } from '../../datasources'

export default {
  Query: {
    getTrip: async (
      _: unknown,
      { tripId }: { tripId: string },
      {
        ctx,
        req,
        res,
        dataSources,
      }: {
        ctx: TokenDecoded
        req: Request
        res: Response
        dataSources: BonavoyDataSources
      },
    ) => {
      return await dataSources.trips.findTrip(tripId)
    },
  },
  Mutation: {
    createTrip: async (
      _: unknown,
      { trip }: { trip: Trip },
      {
        ctx,
        req,
        res,
        dataSources,
      }: {
        ctx: TokenDecoded
        req: Request
        res: Response
        dataSources: BonavoyDataSources
      },
    ) => {
      return dataSources.trips.createTrip(trip)
    },
  },
}
