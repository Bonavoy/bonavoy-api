// types
import { Context } from '@bonavoy/types/auth'
import { Resolvers, Transportation, TransportationType } from '@bonavoy/generated/graphql'
import { transportationPubSub } from '@bonavoy/pubsub/kafka'
import { KafkaMessage } from 'kafkajs'
import { UNAUTHORIZED } from '@bonavoy/apollo/errors/codes'
import { GraphQLError } from 'graphql'

// TODO: WRITE TYPES
export const resolvers: Resolvers = {
  Query: {
    transportation: async (_parent, { placeId }, ctx: Context) => {
      const canAccessPlace = await ctx.accessControl.canAccessPlaces(ctx.auth.sub!, [placeId])
      if (!canAccessPlace) {
        throw new GraphQLError('Not allowed to view this transportation', { extensions: { code: UNAUTHORIZED } })
      }

      const dbTransportation = await ctx.dataSources.transportation.find(placeId)
      const transportationArr = dbTransportation.map((connectedTransportation) => {
        const connectingTransportationList = connectedTransportation.map((transportation) => {
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
            departureLocation: transportation.departureLocation,
            departureTime: transportation.departureTime,
            arrivalLocation: transportation.arrivalLocation,
            arrivalTime: transportation.arrivalTime,
            details: transportation.details,
            type: transportationType,
            order: transportation.order,
            departureCoords,
            arrivalCoords,
            connectingId: transportation.connectingId,
            connectingOrder: transportation.connectingOrder,
          }
        })

        connectingTransportationList.sort((a, b) => a.connectingOrder - b.connectingOrder)

        return connectingTransportationList
      })

      transportationArr.sort((a, b) => a[0].order - b[0].order)

      return transportationArr
    },
  },
  Mutation: {
    addTransportation: async (_parent, { placeId, transportation }, ctx: Context) => {
      const canAccessPlace = await ctx.accessControl.canAccessPlaces(ctx.auth.sub!, [placeId])
      if (!canAccessPlace) {
        throw new GraphQLError('Not allowed to view this place', { extensions: { code: UNAUTHORIZED } })
      }

      const newTransportation = await ctx.dataSources.transportation.create(placeId, {
        type: transportation.type,
        id: transportation.id, // allow client to generate id due to race condition with subscription
        departureLocation: transportation.departureLocation,
        departureTime: transportation.departureTime,
        arrivalLocation: transportation.arrivalLocation,
        arrivalTime: transportation.arrivalTime,
        details: transportation.details,
        departureLat: transportation.departureCoords?.lat,
        departureLng: transportation.departureCoords?.lng,
        arrivalLat: transportation.arrivalCoords?.lat,
        arrivalLng: transportation.arrivalCoords?.lng,
        connectingId: transportation.connectingId,
        order: transportation.order,
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
        departureLocation: newTransportation.departureLocation,
        departureTime: newTransportation.departureTime,
        arrivalLocation: newTransportation.arrivalLocation,
        arrivalTime: newTransportation.arrivalTime,
        details: newTransportation.details,
        type: transportationType,
        order: newTransportation.order,
        departureCoords,
        arrivalCoords,
        connectingId: newTransportation.connectingId,
        connectingOrder: newTransportation.connectingOrder,
      }
    },
    updateTransportation: async (_parent, { id, transportation }, ctx: Context) => {
      // const canAccessTransportation = await ctx.accessControl.canAccessTransportation(ctx.auth.sub!, [id])
      // if (!canAccessTransportation) {
      //   throw new GraphQLError('Not allowed to update this transportation', { extensions: { code: UNAUTHORIZED } })
      // }

      const updatedTransportation = await ctx.dataSources.transportation.update(id, {
        departureLocation: transportation?.departureLocation ?? undefined,
        departureTime: transportation?.departureTime ?? undefined,
        arrivalLocation: transportation?.arrivalLocation ?? undefined,
        arrivalTime: transportation?.arrivalTime ?? undefined,
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
        departureLocation: updatedTransportation.departureLocation,
        departureTime: updatedTransportation.departureTime,
        arrivalLocation: updatedTransportation.arrivalLocation,
        arrivalTime: updatedTransportation.arrivalTime,
        details: updatedTransportation.details,
        type: transportationType,
        order: updatedTransportation.order,
        departureCoords,
        arrivalCoords,
        connectingId: updatedTransportation.connectingId,
        connectingOrder: updatedTransportation.connectingOrder,
      }
    },
    deleteTransportation: async (_parent, { id }, ctx: Context) => {
      // const canAccessTransportation = await ctx.accessControl.canAccessTransportation(ctx.auth.sub!, [id])
      // if (!canAccessTransportation) {
      //   throw new GraphQLError('Not allowed to delete this transportation', { extensions: { code: UNAUTHORIZED } })
      // }

      const deletedTransportation = await ctx.dataSources.transportation.delete(id)
      return deletedTransportation.id
    },
  },
  Subscription: {
    // gotta typecast to any cuz these mfs didn't sync up the subscription library with apollo server
    transportation: {
      subscribe: async (_, { placeIds }) => {
        // (payload: any, variables: any) => true,
        if (false) {
          // TODO: access control
          return Promise.reject('you do not have permission to view this trip')
        }
        return (await transportationPubSub).asyncIterator<Transportation>([
          process.env.KAFKA_TRANSPORTATION_STREAM_TOPIC!,
        ]) as any
      },
      resolve: (payload: KafkaMessage) => {
        // transform the Kafka event to the expected subscription payload
        const payloadString = payload.value ? payload.value.toString() : ''
        const transportationMsg = JSON.parse(payloadString)

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

        const transportation: Transportation = {
          id: transportationMsg.id,
          departureLocation: transportationMsg.departureLocation,
          departureTime: transportationMsg.departureTime ? new Date(transportationMsg.departureTime) : null,
          arrivalLocation: transportationMsg.arrivalLocation,
          arrivalTime: transportationMsg.arrivalTime ? new Date(transportationMsg.arrivalTime) : null,
          details: transportationMsg.details,
          type: transportationType,
          order: transportationMsg.order,
          departureCoords,
          arrivalCoords,
          connectingId: transportationMsg.connectingId,
          connectingOrder: transportationMsg.connectingOrder,
        }
        return {
          transportation,
          placeId: transportationMsg.placeId,
          deleted: transportationMsg.__deleted === 'false' ? false : true, // idk why but we receive this as a string
        }
      },
    },
  },
  Transportation: {
    route: async (parent, _args, ctx: Context) => {
      if (
        parent.type !== TransportationType.Car ||
        !parent.arrivalCoords ||
        !parent.departureCoords ||
        !parent.arrivalCoords.lat ||
        !parent.arrivalCoords.lng ||
        !parent.departureCoords.lat ||
        !parent.departureCoords.lng
      ) {
        return null
      }

      const routeResponse = await ctx.dataSources.mapboxAPI.getRoute([
        {
          lat: parent.departureCoords.lat,
          lng: parent.departureCoords.lng,
        },
        {
          lat: parent.arrivalCoords.lat,
          lng: parent.arrivalCoords.lng,
        },
      ])

      if (routeResponse.code === 'NoRoute' || routeResponse.code === 'NoSegment' || routeResponse.routes.length === 0) {
        return {
          segments: [],
          duration: 0,
        }
      }

      return {
        segments: routeResponse.routes[0].geometry.coordinates,
        duration: routeResponse.routes[0].duration,
      }
    },
  },
}

export default resolvers
