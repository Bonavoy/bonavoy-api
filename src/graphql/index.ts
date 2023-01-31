import { gql } from 'graphql-tag'

import { mergeRawSchemas } from '../utils/mergeRawSchemas'
import graphqlSchemas from './schemas'
import graphqlScalars from './schemas/scalars/DateTime'

const schema = mergeRawSchemas(
  {
    typeDefs: [
      // we create empty main types, we can later extend them in the shards
      gql`
        type Query {
          _empty: String
        }
        type Mutation {
          _empty: String
        }
        type Subscription {
          _empty: String
        }
      `,
    ],
    resolvers: {},
  },
  graphqlSchemas,
  graphqlScalars,
)

// we turn the schema into an object apollo can use to create an api
export default schema
