//modules
import { mergeRawSchemas } from '@bonavoy/utils/mergeRawSchemas'
import DayPlan from './DayPlan'
import Location from './Location'
import Place from './Place'
import Activity from './Activity'
import Trip from './Trip'
import User from './User'
import AuthorsOnTrips from './AuthorsOnTrips'
import DateTime from './scalars/DateTime'
import Transportation from './Transportation'

export default mergeRawSchemas(User, Trip, Activity, Place, Location, DayPlan, AuthorsOnTrips, DateTime, Transportation)
