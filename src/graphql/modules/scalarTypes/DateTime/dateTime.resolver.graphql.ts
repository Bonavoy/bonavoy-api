import { GraphQLScalarType, Kind } from 'graphql'
import { getISODateTime } from '../../../../utils/date'

// TODO: change the any types to something more specific
export default {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type that is timezone agnostic',
    serialize(value: any) {
      return getISODateTime(value)
    },
    parseValue(value: any) {
      return new Date(value + 'Z') // set timezone to UTC
    },
    parseLiteral(value: any) {
      return new Date(value + 'Z') // set timezone to UTC
    },
  }),
}
