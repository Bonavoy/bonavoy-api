import { DataSource } from 'apollo-datasource'
import { Redis } from 'ioredis'

import { Context } from '@bonavoy/types/auth'
import { AuthorPresentMessage, ActiveElement } from '@bonavoy/graphql/schemas/Planner/planner.resolver.graphql'

// Crud interface for all transient data about the planner
export default class Planner extends DataSource {
  static PRESENCE_KEY = 'PRESENCE'
  static ACTIVE_ELEMENT_KEY = 'ACTIVE_ELEMENT'
  private redis: Redis
  context: Context | undefined

  constructor(redis: Redis) {
    super()
    this.redis = redis
  }

  static PresenceKey = (tripId: string) => {
    return `${Planner.PRESENCE_KEY}:${tripId}`
  }

  static ActiveElementKey = (tripId: string) => {
    return `${Planner.ACTIVE_ELEMENT_KEY}:${tripId}`
  }

  findPresentAuthor = async (tripId: string, authorId: string): Promise<AuthorPresentMessage | null> => {
    const data = await this.redis.get(`${Planner.PRESENCE_KEY}:${tripId}:${authorId}`)
    if (!data) return null
    const authorPresent = JSON.parse(data) as AuthorPresentMessage
    return authorPresent
  }

  findManyAuthorsPresent = async (tripId: string): Promise<AuthorPresentMessage[]> => {
    const authorsPresentPromises: Promise<AuthorPresentMessage>[] = []
    const scanPresentAuthors = new Promise((res, rej) => {
      const stream = this.redis.scanStream({
        match: `${Planner.PresenceKey(tripId)}:*`,
      })

      stream.on('data', (keys) => {
        for (const key of keys) {
          authorsPresentPromises.push(
            this.redis.get(key).then((data) => {
              if (!data) rej('got null value for author present')
              const authorPresent = JSON.parse(data!) as AuthorPresentMessage
              return authorPresent
            }),
          )
        }
      })

      stream.on('end', () => {
        return res(authorsPresentPromises)
      })
    })

    await scanPresentAuthors

    const presentAuthors = await Promise.all(authorsPresentPromises)

    return presentAuthors
  }

  setAuthorPresent = async (tripId: string, val: AuthorPresentMessage): Promise<boolean> => {
    const serialized = JSON.stringify(val)
    return 'OK' === (await this.redis.set(`${Planner.PresenceKey(tripId)}:${val.authorPresent.id}`, serialized))
  }

  deleteAuthorPresent = async (key: string) => {
    return await this.redis.del(Planner.PresenceKey(key))
  }

  findManyActiveElements = async (tripId: string) => {
    const activeElementPromises: Promise<ActiveElement>[] = []
    const scanActiveElements = new Promise((res, rej) => {
      const stream = this.redis.scanStream({
        match: `${Planner.ActiveElementKey(tripId)}:*`,
      })

      stream.on('data', (keys) => {
        for (const key of keys) {
          activeElementPromises.push(
            this.redis.get(key).then((data) => {
              if (!data) rej('got null value for active element')
              const activeElement = JSON.parse(data!) as ActiveElement

              return activeElement
            }),
          )
        }
      })

      stream.on('end', () => {
        return res(activeElementPromises)
      })
    })

    await scanActiveElements

    const activeElements = await Promise.all(activeElementPromises)

    return activeElements
  }

  updateActiveElements = async (key: string, activeElement: ActiveElement) => {
    const serialized = JSON.stringify(activeElement)
    return 'OK' === (await this.redis.set(`${Planner.ActiveElementKey(key)}:${activeElement.elementId}`, serialized))
  }

  deleteActiveElement = async (key: string, activeElement: ActiveElement) => {
    return 1 <= (await this.redis.del(`${Planner.ActiveElementKey(key)}:${activeElement.elementId}`))
  }
}
