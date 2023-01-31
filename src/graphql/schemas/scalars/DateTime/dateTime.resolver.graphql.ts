import { GraphQLScalarType } from 'graphql'
import { getISODateTime } from '../../../../utils/date'

// TODO: change the any types to something more specific
export default {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type that is timezone agnostic ie. relative to UTC',
    serialize(value: any) {
      const d = getISODateTime(value)
      console.log('seraliozlike', d)
      return d
    },
    parseValue(value: any) {
      console.log('parwsd', new Date(value))
      return new Date(value)
    },
    parseLiteral(value: any) {
      return new Date(value)
    },
  }),
}
