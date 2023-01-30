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
