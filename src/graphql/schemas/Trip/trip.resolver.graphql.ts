import { Place, Prisma } from '@prisma/client'
import { GraphQLError } from 'graphql'
import { any } from 'jest-mock-extended'
import { MutationCreateTripArgs, QueryTripArgs, Resolvers, Trip, TripRole } from '../../../generated/graphql'

//types
import { Context } from '../../../types/auth'
import { DBTrip } from '../../datasources/types'

const resolvers: Resolvers = {
  Query: {
    trip: async (_parent, { tripId }: QueryTripArgs, ctx: Context) => {
      const trip = await ctx.dataSources.trips.findTrip(tripId)
      if (!trip) {
        throw new GraphQLError(`could not find trip with id ${tripId}`)
      }
      return {
        id: trip.id,
        name: trip.name,
        banner: trip.banner,
        endDate: trip.endDate,
        startDate: trip.startDate,
        isPublic: trip.isPublic,
        authors: {} as any, // let Authors resolver handle
        places: [], // let places resolver handle
      }
    },
    trips: async (_parent, { after, limit }, ctx: Context) => {
      const trips = await ctx.dataSources.trips.findTrips(ctx.auth.sub!, limit, after)
      const tripCount = await ctx.dataSources.trips.countUserTrips(ctx.auth.sub!)

      const tripEdges = trips.map((trip) => {
        return {
          node: {
            id: trip.id,
            name: trip.name,
            banner: trip.banner,
            endDate: trip.endDate,
            startDate: trip.startDate,
            isPublic: trip.isPublic,
            authors: {} as any, // let Authors resolver handle
            places: [], // let places resolver handle
          },
        }
      })

      return {
        edges: tripEdges,
        totalCount: tripCount,
        pageInfo: {
          endCursor: trips[trips.length - 1]?.id || '',
          hasNextPage: true, // TODO
        },
      }
    },
  },
  Mutation: {
    createTrip: async (_parent, { trip }: MutationCreateTripArgs, ctx: Context): Promise<Trip> => {
      const dbTrip: DBTrip = {
        name: trip.name,
        // banner: (await ctx.dataSources.unsplashAPI.getTripBannerPhoto(trip.places[0].country)).urls.regular,
        banner: 'uhhh some banner idk',
        startDate: trip.startDate,
        endDate: trip.endDate,
        isPublic: trip.isPublic,
        places: trip.places.map((place) => {
          return {
            mapbox_id: place.mapbox_id,
            place_name: place.place_name,
            text: place.text,
            startDate: place.startDate,
            endDate: place.endDate,
            colour: place.colour,
            center: place.center.map((coord_component) => coord_component as number),
            country: place.country,
            dayPlans: [], // empty for now since we don't pass day plans with trip creation, could change
          }
        }),
      }
      const newTrip = await ctx.dataSources.trips.createTrip(ctx.auth.sub!, dbTrip)
      return {
        id: newTrip.id,
        name: newTrip.name,
        banner: newTrip.banner,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        isPublic: newTrip.isPublic,
        places: [], // let trip places resolver resolve
        authors: [], // let trip authors resolver resolve
      }
    },
    updateTrip: async (_parent, { updateTripInput }, ctx: Context) => {
      // return (await ctx.dataSources.trips.updateTripName(tripId, name)).name
      return {} as any
    },
    deleteTrip: async (_parent, { id }, ctx: Context) => {
      return {} as any
    },
  },
  Trip: {
    authors: async (parent, _args, ctx: Context) => {
      const authorsOnTrips = await ctx.dataSources.authors.findAuthors(parent.id)
      return authorsOnTrips?.map((authorOnTrip) => {
        let tripRole = TripRole.Viewer

        switch (authorOnTrip.role) {
          case TripRole.Author:
            tripRole = TripRole.Author
            break
          case TripRole.Editor:
            tripRole = TripRole.Editor
            break
          default:
            tripRole = TripRole.Viewer
        }

        return {
          id: authorOnTrip.id,
          user: {} as any,
          role: tripRole,
          trip: {} as any,
          userId: authorOnTrip.userId, // return so can be passed to authors on trips resolver
        }
      })
    },
    places: async (parent, _args, ctx: Context) => {
      const places = await ctx.dataSources.places.findPlaces(parent.id)

      return places?.map((place) => {
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
  },
}

export default resolvers
