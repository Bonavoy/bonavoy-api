//modules
import { mergeRawSchemas } from '../../utils/mergeRawSchemas'
import DayPlan from './DayPlan'
import Location from './Location'
import Place from './Place'
import Spot from './Spot'
import SpotSuggestion from './SpotSuggestion'
import Trip from './Trip'
import User from './User'

export default mergeRawSchemas(User, Trip, SpotSuggestion, Spot, Place, Location, DayPlan)
