import { DataSource } from 'apollo-datasource'
import { Redis } from 'ioredis'

import { Context } from '@bonavoy/types/auth'
import { AuthorPresentMessage } from '@bonavoy/graphql/schemas/Planner/planner.resolver.graphql'

export default class Planner extends DataSource {
  private redis: Redis
  context: Context | undefined

  constructor(redis: Redis) {
    super()
    this.redis = redis
  }

  findMany = async (tripId: string): Promise<AuthorPresentMessage[]> => {
    const keys = await this.redis.keys(`${tripId}:*`)
    if (keys.length === 0) return []

    const authorsPresent = await this.redis.mget(keys)
    return authorsPresent.map((authorPresent) => JSON.parse(authorPresent!))
  }

  set = async (key: string, val: AuthorPresentMessage): Promise<boolean> => {
    const serialized = JSON.stringify(val)
    return 'OK' === (await this.redis.set(key, serialized))
  }

  delete = async (key: string) => {
    return await this.redis.del(key)
  }
}
