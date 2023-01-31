// following are types that crud functions accept and return

export interface DBUser {
  email: string
  username: string
  firstname: string
  lastname: string
  password: string
  avatar: string | null
  verified: boolean
}

export interface DBAuthorsOnTrips {}

export interface DBTrip {
  id?: string
  name: string
  banner: string
  startDate: Date
  endDate: Date
  isPublic: boolean
  places: DBPlace[]
}

export interface DBPlace {
  id?: string
  tripId?: string
  mapbox_id: string
  place_name: string
  text: string
  startDate: Date | null
  endDate: Date | null
  colour: string
  center: number[]
  country: string
  dayPlans: DBDayPlans[]
}

export interface DBDayPlans {}
