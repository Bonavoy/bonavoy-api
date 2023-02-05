// TODO: WRITE TYPES

import { Context } from '@bonavoy/types/auth'
import { Resolvers } from '@bonavoy/generated/graphql'
import { GraphQLError } from 'graphql'

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
      const dayPlan = await ctx.dataSources.dayPlans.findDayPlan(id)
      if (!dayPlan) {
        throw new GraphQLError(`Could not find dayplan with id ${id}`)
      }

      return {
        id: dayPlan.id,
        date: dayPlan.date,
        order: dayPlan.order,
        activities: [], // let this be resolved
      }
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
    updateDayPlan: async (_parent, { id, updateDayPlan }, ctx: Context) => {
      const newDayPlan = await ctx.dataSources.dayPlans.updateDayPlan(id, {
        order: updateDayPlan.order || undefined,
        date: updateDayPlan.date || undefined,
      })
      return {
        id: newDayPlan.id,
        order: newDayPlan.order,
        date: newDayPlan.date,
        activities: [], // let this be resolved
      }
    },
    deleteDayPlan: async (_parent, { id }, ctx: Context) => {
      const deletedDayPlan = await ctx.dataSources.dayPlans.deleteDayPlan(id)
      return deletedDayPlan.id
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
