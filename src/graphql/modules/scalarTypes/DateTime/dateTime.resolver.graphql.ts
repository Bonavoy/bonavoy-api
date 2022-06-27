import { GraphQLScalarType, Kind } from 'graphql'
import { getISODateTime } from '../../../../utils/date'

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
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
      }
      return null // Invalid hard-coded value (not an integer)
    },
  }),
}
