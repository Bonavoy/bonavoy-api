//types
import { TokenDecoded } from '../../../types/auth'
import { BonavoyDataSources } from '../../datasources'

// TODO: WRITE TYPES
export default {
  Query: {
    findPlacesByTrip: async (
      _: unknown,
      args: { tripId: string },
      { dataSources }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      const { tripId } = args
      return await dataSources.places.findPlacesByTrip(tripId)
    },
    findPlaceByDate: async (
      _: unknown,
      args: { tripId: string; date: Date },
      { dataSources }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: BonavoyDataSources },
    ) => {
      const { tripId, date } = args
      return await dataSources.places.findPlaceByDate(tripId, date)
    },
  },
}
