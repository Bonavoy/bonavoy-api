// types
import { Context } from '@bonavoy/types/auth'
import { Resolvers, TransportationType } from '@bonavoy/generated/graphql'
import { GraphQLError } from 'graphql'

// TODO: WRITE TYPES
export const resolvers: Resolvers = {
  Query: {
    transportation: async (_parent, { placeId }, ctx: Context) => {
      const transportations = await ctx.dataSources.transportation.find(placeId)

      return transportations.map((transportation) => {
        let transportationType = TransportationType.Car
        switch (transportation.type) {
          case TransportationType.Plane:
            transportationType = TransportationType.Plane
            break
          case TransportationType.Bus:
            transportationType = TransportationType.Bus
            break
        }
        return {
          id: transportation.id,
          departure_location: transportation.departure_location,
          departure_time: transportation.departure_time,
          arrival_location: transportation.arrival_location,
          arrival_time: transportation.arrival_time,
          details: transportation.details,
          type: transportationType,
        }
      })
    },
  },
  Mutation: {
    addTransportation: async (_parent, { placeId, transportation }, ctx: Context) => {
      const newTransportation = await ctx.dataSources.transportation.create(placeId, {
        type: transportation.type,
        departure_location: transportation.departure_location,
        departure_time: transportation.departure_time,
        arrival_location: transportation.arrival_location,
        arrival_time: transportation.arrival_time,
        details: transportation.details,
      })
      let transportationType = TransportationType.Car

      switch (newTransportation.type) {
        case TransportationType.Plane:
          transportationType = TransportationType.Plane
          break
        case TransportationType.Bus:
          transportationType = TransportationType.Bus
          break
      }

      return {
        id: newTransportation.id,
        departure_location: newTransportation.departure_location,
        departure_time: newTransportation.departure_time,
        arrival_location: newTransportation.arrival_location,
        arrival_time: newTransportation.arrival_time,
        details: newTransportation.details,
        type: transportationType,
      }
    },
  },
}

export default resolvers
