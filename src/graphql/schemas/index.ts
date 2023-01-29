//modules
import { mergeRawSchemas } from '../../utils/mergeRawSchemas'
import DayPlan from './DayPlan'
import Location from './Location'
import Place from './Place'
import Spot from './Spot'
import Trip from './Trip'
import User from './User'

export default mergeRawSchemas(User, Trip, Spot, Place, Location, DayPlan)
