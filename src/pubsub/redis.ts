import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

const redisOptions = {
  host: process.env.REDIS_PLANNER_PRESENCE_URI!,
  port: Number(process.env.REDIS_PLANNER_PRESENCE_PORT!),
  password: process.env.REDIS_PLANNER_PRESENCE_PASSWORD!,
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
}

export const plannerPubSub = new RedisPubSub({
  publisher: new Redis(redisOptions),
  subscriber: new Redis(redisOptions),
})
