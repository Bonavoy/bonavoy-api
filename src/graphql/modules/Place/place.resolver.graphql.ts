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
  },
}
