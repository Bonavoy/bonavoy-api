// TODO: WRITE TYPES

import { Context } from '../../../types/auth'
import { Resolvers } from '../../../generated/graphql'

export const resolvers: Resolvers = {
  Query: {
    dayPlans: async (_parent, { placeId }, ctx: Context) => {
      const dayPlans = await ctx.dataSources.dayPlans.findDayPlans(placeId)
      return dayPlans.map((dayPlan) => ({
        id: dayPlan.id,
        date: dayPlan.date,
        order: dayPlan.order,
        activities: [], // let this be resolved
      }))
    },
    dayPlan: async (_parent, { id }, ctx: Context) => {
      return {} as any
    },
  },
  Mutation: {
    createDayPlan: async (_parent, { placeId, dayPlan }, ctx: Context) => {
      const newDayPlan = await ctx.dataSources.dayPlans.createDayPlan(placeId, {
        order: dayPlan.order,
        date: dayPlan.date,
      })
      return {
        id: newDayPlan.id,
        date: dayPlan.date,
        order: dayPlan.order,
        activities: [], // let this be resolved
      }
    },
    updateDayPlan: async () => {
      return {} as any
    },
    deleteDayPlan: async () => {
      return {} as any
    },
  },
  DayPlan: {
    activities: async (parent, _args, ctx: Context) => {
      const dayPlanId = parent.id
      const activities = await ctx.dataSources.activity.findActivities(dayPlanId)
      return activities.map((activity) => ({
        id: activity.id,
        start: activity.startTime,
        end: activity.endTime,
        name: activity.name,
        order: activity.order,
      }))
    },
  },
}

export default resolvers
