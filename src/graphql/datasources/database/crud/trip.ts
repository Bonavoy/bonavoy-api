import { DataSource } from 'apollo-datasource';

import { PrismaClient, Trip } from '@prisma/client';

import { Context } from '../../../../types/auth';

export default class TripsAPI extends DataSource {
  prisma: PrismaClient;
  context: Context;

  constructor({ prisma }: { prisma: PrismaClient }) {
    super();
    this.prisma = prisma;
    this.context = {} as Context;
  }

  async createTrip(trip: Trip) {
    return await this.prisma.trip.create({
      data: {
        ...trip,
      },
    });
  }

  async findTrip(tripId: string) {
    return await this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });
  }
}
