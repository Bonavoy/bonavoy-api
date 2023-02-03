// types
import { Context } from '@bonavoy/types/auth'
import { Resolvers } from '@bonavoy/generated/graphql'
import { GraphQLError } from 'graphql'

// TODO: WRITE TYPES
export const resolvers: Resolvers = {
  Query: {
    places: async (_parent, { tripId }, ctx: Context) => {
      const places = await ctx.dataSources.places.findPlaces(tripId)
      return places.map((place) => {
        return {
          id: place.id,
          mapbox_id: place.mapbox_id,
          place_name: place.place_name,
          center: place.center,
          colour: place.colour,
          country: place.country,
          startDate: place.startDate,
          endDate: place.endDate,
          text: place.text,
          dayPlans: {} as any, // let this be resolved
        }
      })
    },
    place: async (_parent, { id }, ctx: Context) => {
      const place = await ctx.dataSources.places.findPlace(id)

      if (!place) {
        throw new GraphQLError(`Could not find place with id ${id}`)
      }

      return {
        id: place.id,
        mapbox_id: place.mapbox_id,
        place_name: place.place_name,
        center: place.center,
        colour: place.colour,
        country: place.country,
        startDate: place.startDate,
        endDate: place.endDate,
        text: place.text,
        dayPlans: [], // let this be resolved
      }
    },
  },
  Mutation: {
    createPlace: async (_parent, { tripId, place }, ctx: Context) => {
      // TODO: validate color
      if (place.center?.length != 2) {
        throw new GraphQLError('Center needs to a be a coordinate pair [lat, lng]')
      }

      if (place.place_name && (place.place_name?.length < 3 || 30 < place.place_name?.length)) {
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
        mapbox_id: place.mapbox_id,
        place_name: place.place_name,
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
        mapbox_id: dbPlace.mapbox_id,
        place_name: dbPlace.place_name,
        dayPlans: [],
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

      if (place.place_name && (place.place_name?.length < 3 || 30 < place.place_name?.length)) {
        throw new GraphQLError('Length of place name needs to be between 3 and 30')
      }

      if (place.country && (place.country?.length < 3 || 30 < place.country?.length)) {
        throw new GraphQLError('Length of country needs to be between 3 and 30')
      }

      if (place.text && 512 < place.text?.length) {
        throw new GraphQLError('Length of text cannot be longer than 512 characters')
      }

      const updatedPlace = await ctx.dataSources.places.updatePlace(id, {
        place_name: place.place_name || undefined,
        mapbox_id: place.mapbox_id || undefined,
        text: place.text || undefined,
        startDate: place.startDate,
        endDate: place.endDate,
        colour: place.colour || undefined,
        center: place.center || undefined,
        country: place.country || undefined,
      })
      return {
        id: updatedPlace.id,
        place_name: updatedPlace.place_name,
        mapbox_id: updatedPlace.mapbox_id,
        text: updatedPlace.text,
        startDate: updatedPlace.startDate,
        endDate: updatedPlace.endDate,
        colour: updatedPlace.colour,
        center: updatedPlace.center,
        country: updatedPlace.country,
        dayPlans: [],
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
  },
}

export default resolvers
