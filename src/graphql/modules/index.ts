import { createApplication } from 'graphql-modules'

//modules
import userModule from './User/user.module.graphql'
import tripModule from './Trip/trip.module.graphql'
import locationModule from './Location/location.module.graphql'
import dayPlanModule from './DayPlan/dayPlan.module.graphql'
import spotModule from './Spot/spot.module.graphql'
import placeModule from './Place/place.module.graphql'
import dateTimeModule from './scalarTypes/DateTime/dateTime.module.graphql'
import spotSuggestionModule from './SpotSuggestion/spotSuggestion.module.graphql'

//combine all resolvers and types
export const apolloApplication = createApplication({
  modules: [
    userModule,
    tripModule,
    locationModule,
    spotModule,
    dayPlanModule,
    placeModule,
    dateTimeModule,
    spotSuggestionModule,
  ],
})
