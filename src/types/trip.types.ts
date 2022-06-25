export interface Trip {
  id?: string
  name: string
  places: Place[]
  // author: { type: Schema.Types.ObjectId, ref: 'user' },
  // participants: [{ type: Schema.Types.ObjectId }], // Note: does not populate User document here due to circular dependency
  isPublic: boolean
}

export interface Place {
  id?: string
  name: string
  mapbox_id: string
  from: Date
  to: Date
  duration: number
  dayPlan: DayPlan[]
}

export interface DayPlan {
  id?: string
  date: Date
  spotsOfInterest: SpotOfInterest[]
}

export interface SpotOfInterest {
  id?: string
  fsq_id: string
  from: string
  to: string
}
