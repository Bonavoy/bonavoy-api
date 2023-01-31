//modules
import { mergeRawSchemas } from '../../utils/mergeRawSchemas'
import DayPlan from './DayPlan'
import Location from './Location'
import Place from './Place'
import Spot from './Spot'
import Trip from './Trip'
import User from './User'
import AuthorsOnTrips from './AuthorsOnTrips'
import DateTime from './scalars/DateTime'

export default mergeRawSchemas(User, Trip, Spot, Place, Location, DayPlan, AuthorsOnTrips, DateTime)
