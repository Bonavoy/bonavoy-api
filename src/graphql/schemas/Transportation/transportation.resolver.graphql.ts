// types
import { Context } from '@bonavoy/types/auth'
import { Resolvers, Transportation, TransportationType } from '@bonavoy/generated/graphql'
import { GraphQLError } from 'graphql'
import { transportationPubSub } from '@bonavoy/kafka'
import { KafkaMessage } from 'kafkajs'

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

        let departureCoords
        if (transportation.departureLat && transportation.departureLng) {
          departureCoords = {
            lng: transportation.departureLng,
            lat: transportation.departureLat,
          }
        }

        let arrivalCoords
        if (transportation.arrivalLat && transportation.arrivalLng) {
          arrivalCoords = {
            lng: transportation.arrivalLng,
            lat: transportation.arrivalLat,
          }
        }

        return {
          id: transportation.id,
          departure_location: transportation.departure_location,
          departure_time: transportation.departure_time,
          arrival_location: transportation.arrival_location,
          arrival_time: transportation.arrival_time,
          details: transportation.details,
          type: transportationType,
          order: transportation.order,
          departureCoords,
          arrivalCoords,
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
        departureLat: transportation.departureCoords?.lat,
        departureLng: transportation.departureCoords?.lng,
        arrivalLat: transportation.arrivalCoords?.lat,
        arrivalLng: transportation.arrivalCoords?.lng,
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

      let departureCoords
      if (newTransportation.departureLat && newTransportation.departureLng) {
        departureCoords = {
          lng: newTransportation.departureLng,
          lat: newTransportation.departureLat,
        }
      }

      let arrivalCoords
      if (newTransportation.arrivalLat && newTransportation.arrivalLng) {
        arrivalCoords = {
          lng: newTransportation.arrivalLng,
          lat: newTransportation.arrivalLat,
        }
      }

      return {
        id: newTransportation.id,
        departure_location: newTransportation.departure_location,
        departure_time: newTransportation.departure_time,
        arrival_location: newTransportation.arrival_location,
        arrival_time: newTransportation.arrival_time,
        details: newTransportation.details,
        type: transportationType,
        order: newTransportation.order,
        departureCoords,
        arrivalCoords,
      }
    },
    updateTransportation: async (_parent, { id, transportation }, ctx: Context) => {
      const updatedTransportation = await ctx.dataSources.transportation.update(id, {
        departure_location: transportation?.departure_location ?? undefined,
        departure_time: transportation?.departure_time ?? undefined,
        arrival_location: transportation?.arrival_location ?? undefined,
        arrival_time: transportation?.arrival_time ?? undefined,
        details: transportation?.details ?? undefined,
        type: transportation?.type ?? undefined,
        arrivalLat: transportation.arrivalCoords?.lat,
        arrivalLng: transportation.arrivalCoords?.lng,
        departureLat: transportation.departureCoords?.lat,
        departureLng: transportation.departureCoords?.lng,
      })
      let transportationType = TransportationType.Car
      switch (updatedTransportation.type) {
        case TransportationType.Plane:
          transportationType = TransportationType.Plane
          break
        case TransportationType.Bus:
          transportationType = TransportationType.Bus
          break
      }

      let departureCoords
      if (updatedTransportation.departureLat && updatedTransportation.departureLng) {
        departureCoords = {
          lng: updatedTransportation.departureLng,
          lat: updatedTransportation.departureLat,
        }
      }

      let arrivalCoords
      if (updatedTransportation.arrivalLat && updatedTransportation.arrivalLng) {
        arrivalCoords = {
          lng: updatedTransportation.arrivalLng,
          lat: updatedTransportation.arrivalLat,
        }
      }

      return {
        id: updatedTransportation.id,
        departure_location: updatedTransportation.departure_location,
        departure_time: updatedTransportation.departure_time,
        arrival_location: updatedTransportation.arrival_location,
        arrival_time: updatedTransportation.arrival_time,
        details: updatedTransportation.details,
        type: transportationType,
        order: updatedTransportation.order,
        departureCoords,
        arrivalCoords,
      }
    },
  },
  Subscription: {
    transportation: {
      subscribe: async (_, args) =>
        (await transportationPubSub).asyncIterator<Transportation>([
          'bonavoy_db_replication_stream_Transportation',
        ]) as any, // typecast is hacky but oh well
      resolve: (payload: KafkaMessage) => {
        // transform the Kafka event to the expected subscription payload
        console.log('oh boy')
        const payloadString = payload.value ? payload.value.toString() : ''

        const transportationMsg = JSON.parse(payloadString)

        console.log(transportationMsg)
        let transportationType = TransportationType.Car
        switch (transportationMsg.type) {
          case TransportationType.Plane:
            transportationType = TransportationType.Plane
            break
          case TransportationType.Bus:
            transportationType = TransportationType.Bus
            break
        }

        let departureCoords
        if (transportationMsg.departureLat && transportationMsg.departureLng) {
          departureCoords = {
            lng: transportationMsg.departureLng,
            lat: transportationMsg.departureLat,
          }
        }

        let arrivalCoords
        if (transportationMsg.arrivalLat && transportationMsg.arrivalLng) {
          arrivalCoords = {
            lng: transportationMsg.arrivalLng,
            lat: transportationMsg.arrivalLat,
          }
        }

        return {
          id: transportationMsg.id,
          departure_location: transportationMsg.departure_location,
          departure_time: transportationMsg.departure_time,
          arrival_location: transportationMsg.arrival_location,
          arrival_time: transportationMsg.arrival_time,
          details: transportationMsg.details,
          type: transportationType,
          order: transportationMsg.order,
          departureCoords,
          arrivalCoords,
        }
      },
    },
  },
}

export default resolvers
