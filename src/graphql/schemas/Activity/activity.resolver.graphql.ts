import { Resolvers } from '../../../generated/graphql'

//types
import { Context } from '../../../types/auth'

// TODO: query and interpolate names of Foursquare places into activity data so we don't get sued OMEGALUL
const resolvers: Resolvers = {
  Mutation: {
    createActivity: async (_parent, { dayPlanId, activity }, ctx: Context) => {
      const newActivity = await ctx.dataSources.activity.createActivity(dayPlanId, {
        name: activity.name,
        startTime: activity.start,
        endTime: activity.end,
        order: activity.order,
      })

      return {
        id: newActivity.id,
        name: newActivity.name,
        start: newActivity.startTime,
        end: newActivity.endTime,
        order: activity.order,
      }
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
      const deletedActivity = await ctx.dataSources.activity.deleteActivity(id)
      return deletedActivity.id
    },
  },
}

export default resolvers
