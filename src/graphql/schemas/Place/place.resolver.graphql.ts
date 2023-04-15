// types
import { Context } from '@bonavoy/types/auth'
import { Resolvers, TransportationType } from '@bonavoy/generated/graphql'
import { GraphQLError } from 'graphql'

// TODO: WRITE TYPES
export const resolvers: Resolvers = {
  Query: {
    places: async (_parent, { tripId }, ctx: Context) => {
      const places = await ctx.dataSources.places.findPlaces(tripId)
      const placesList = places.map((place) => {
        return {
          id: place.id,
          mapboxId: place.mapboxId,
          placeName: place.placeName,
          center: place.center,
          colour: place.colour,
          country: place.country,
          startDate: place.startDate,
          endDate: place.endDate,
          text: place.text,
          dayPlans: {} as any, // let this be resolved
          transportation: [],
          order: place.order,
        }
      })
      placesList.sort((a, b) => a.order - b.order)
      return placesList
    },
    place: async (_parent, { id }, ctx: Context) => {
      const place = await ctx.dataSources.places.findPlace(id)
      if (!place) {
        throw new GraphQLError(`Could not find place with id ${id}`)
      }
      return {
        id: place.id,
        mapboxId: place.mapboxId,
        placeName: place.placeName,
        center: place.center,
        colour: place.colour,
        country: place.country,
        startDate: place.startDate,
        endDate: place.endDate,
        text: place.text,
        dayPlans: [], // let this be resolved
        transportation: [],
      }
    },
  },
  Mutation: {
    createPlace: async (_parent, { tripId, place }, ctx: Context) => {
      // TODO: validate color
      if (place.center?.length != 2) {
        throw new GraphQLError('Center needs to a be a coordinate pair [lat, lng]')
      }
      if (place.placeName && (place.placeName?.length < 3 || 30 < place.placeName?.length)) {
        throw new GraphQLError('Length of place name needs to be between 3 and 30')
      }
      if (place.country && (place.country?.length < 3 || 30 < place.country?.length)) {
        throw new GraphQLError('Length of country needs to be between 3 and 30')
      }
      if (place.text && 512 < place.text?.length) {
        throw new GraphQLError('Length of text cannot be longer than 512 characters')
      }
      const dbPlace = await ctx.dataSources.places.createPlace(tripId, {
        tripId: tripId,
        mapboxId: place.mapboxId,
        placeName: place.placeName,
        text: place.text,
        startDate: place.startDate,
        endDate: place.endDate,
        colour: place.colour,
        center: place.center,
        country: place.country,
        dayPlans: [],
      })
      return {
        id: dbPlace.id,
        center: dbPlace.center,
        colour: dbPlace.colour,
        country: dbPlace.country,
        startDate: dbPlace.startDate,
        endDate: dbPlace.endDate,
        text: dbPlace.text,
        mapboxId: dbPlace.mapboxId,
        placeName: dbPlace.placeName,
        dayPlans: [],
        transportation: [],
      }
    },
    deletePlace: async (_parent, { placeId }, ctx: Context) => {
      const dbPlace = await ctx.dataSources.places.deletePlace(placeId)
      return dbPlace.id
    },
    updatePlace: async (_parent, { id, place }, ctx: Context) => {
      // TODO: validate color
      if (place.center?.length != 2) {
        throw new GraphQLError('Center needs to a be a coordinate pair [lat, lng]')
      }
      if (place.placeName && (place.placeName?.length < 3 || 30 < place.placeName?.length)) {
        throw new GraphQLError('Length of place name needs to be between 3 and 30')
      }
      if (place.country && (place.country?.length < 3 || 30 < place.country?.length)) {
        throw new GraphQLError('Length of country needs to be between 3 and 30')
      }
      if (place.text && 512 < place.text?.length) {
        throw new GraphQLError('Length of text cannot be longer than 512 characters')
      }
      const updatedPlace = await ctx.dataSources.places.updatePlace(id, {
        placeName: place.placeName || undefined,
        mapboxId: place.mapboxId || undefined,
        text: place.text || undefined,
        startDate: place.startDate,
        endDate: place.endDate,
        colour: place.colour || undefined,
        center: place.center || undefined,
        country: place.country || undefined,
      })
      return {
        id: updatedPlace.id,
        placeName: updatedPlace.placeName,
        mapboxId: updatedPlace.mapboxId,
        text: updatedPlace.text,
        startDate: updatedPlace.startDate,
        endDate: updatedPlace.endDate,
        colour: updatedPlace.colour,
        center: updatedPlace.center,
        country: updatedPlace.country,
        dayPlans: [],
        transportation: [],
      }
    },
  },
  Place: {
    dayPlans: async (parent, _args, ctx: Context) => {
      const dayPlans = await ctx.dataSources.dayPlans.findDayPlans(parent.id)
      return dayPlans.map((dayPlan) => ({
        id: dayPlan.id,
        date: dayPlan.date,
        order: dayPlan.order,
        activities: [], // let this be resolved
      }))
    },
    transportation: async (parent, _args, ctx: Context) => {
      const transportations = await ctx.dataSources.transportation.find(parent.id)
      const transportationList = await transportations.map((transportation) => {
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
        }
      })
      transportationList.sort((a, b) => a.order - b.order)
      return transportationList
    },
  },
}

export default resolvers
