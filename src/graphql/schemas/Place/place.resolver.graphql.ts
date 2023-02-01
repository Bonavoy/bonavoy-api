// types
import { Context } from '../../../types/auth'
import { Resolvers } from '../../../generated/graphql'
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
    deletePlace: async () => {
      return {} as any
    },
    updatePlace: async () => {
      return {} as any
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
