import { PrismaClient } from '@prisma/client'

export interface AccessController {
  canAccessTrips: (userId: string, tripIds: string[]) => Promise<boolean>
  canAccessPlaces: (userId: string, placeIds: string[]) => Promise<boolean>
  canAccessTransportation: (userId: string, transportationIds: string[]) => Promise<boolean>
  // TODO:
  // canAccessDayPlan
  // canAccessActivity
}

export class AccessControl implements AccessController {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  canAccessTrips = async (userId: string, tripIds: string[]) => {
    const trips = await this.prisma.authorsOnTrips.findMany({ where: { tripId: { in: tripIds }, userId } })
    return tripIds.length === trips.length
  }

  canAccessPlaces = async (userId: string, placeIds: string[]) => {
    const places = await this.prisma.authorsOnTrips.findMany({ where: { tripId: { in: placeIds }, userId } })
    return placeIds.length === places.length
  }

  canAccessTransportation = async (userId: string, transportationIds: string[]) => {
    const transportation = await this.prisma.authorsOnTrips.findMany({
      where: { id: { in: transportationIds }, userId },
    })
    return transportationIds.length === transportation.length
  }
}
