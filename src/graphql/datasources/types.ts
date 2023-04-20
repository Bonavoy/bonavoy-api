// following are types that crud functions accept and return
// since the types the Prisma generates usually require fields like
// id, which we don't need when creating some object

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
  mapboxId: string
  placeName: string
  text: string
  startDate: Date | null
  endDate: Date | null
  colour: string
  center: number[]
  country: string
  dayPlans: DBDayPlan[]
}

export interface DBDayPlan {
  id?: string
  date: Date
  order: number
  placeId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface DBActivity {
  id?: string
  name: string
  order: number
  startTime?: Date
  endTime?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface DBTransportation {
  id?: string
  type: TransportationType
  departureLocation: string
  departureTime: Date | null
  arrivalLocation: string
  arrivalTime: Date | null
  details: string
  createdAt?: Date
  updatedAt?: Date
  arrivalLat?: number
  arrivalLng?: number
  departureLat?: number
  departureLng?: number
}

export interface DBInvite {
  email: string
  tripId: string
  role: TripRole
  code: string
}

type TripRole = 'AUTHOR' | 'EDITOR' | 'VIEWER'

export enum TransportationType {
  Bus = 'BUS',
  Car = 'CAR',
  Plane = 'PLANE',
}
