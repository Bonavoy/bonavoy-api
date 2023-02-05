import { GraphQLScalarType } from 'graphql'
import { getISODateTime } from '@bonavoy/utils/date'

// TODO: change the any types to something more specific
export default {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type that is timezone agnostic ie. relative to UTC',
    serialize(value: any) {
      return getISODateTime(value)
    },
    parseValue(value: any) {
      return new Date(value)
    },
    parseLiteral(value: any) {
      return new Date(value)
    },
  }),
}
