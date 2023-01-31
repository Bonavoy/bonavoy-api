import { Activity } from '@prisma/client'
import { differenceInDays, subDays } from 'date-fns'
import { Resolvers } from '../../../generated/graphql'

//types
import { Context } from '../../../types/auth'

// TODO: query and interpolate names of Foursquare places into activity data so we don't get sued OMEGALUL
const resolvers: Resolvers = {
  Mutation: {
    createActivity: async (_parent, { activity }, ctx: Context) => {
      return {} as any
    },
    updateActivity: async () => {
      return {} as any
    },
    deleteActivity: async (_parent, { id }, ctx: Context) => {
      // Note: when deleting a activity, we don't need to reassign
      // the order of each activity in the dayplan (however this may
      // become an issue later) but for now deleting a activity
      // doesn't change any ordering since we are just appending
      //  and deleting activitys
      return (await ctx.dataSources.activity.deleteActivity(id)) as any
    },
  },
}

export default resolvers
