import Keyv from 'keyv'

export interface KeyValueCache<V = string> {
  get(key: string): Promise<V | undefined>
  set(key: string, value: V, opts?: { ttl?: number | null }): Promise<void>
  delete(key: string): Promise<boolean | void>
}

export class KeyvAdapter<V = string> implements KeyValueCache<V> {
  private readonly keyv: Keyv<V>

  constructor(keyv?: Keyv<V>) {
    this.keyv = keyv ?? new Keyv<V>()
  }

  async get(key: string): Promise<V | undefined> {
    return this.keyv.get(key)
  }

  async set(key: string, value: V, opts?: { ttl?: number | null }): Promise<void> {
    // Maybe an unnecessary precaution, just being careful with 0 here. Keyv
    // currently handles 0 as `undefined`. Also `NaN` is typeof `number`
    if (typeof opts?.ttl === 'number' && !Number.isNaN(opts.ttl)) {
      await this.keyv.set(key, value, opts.ttl)
    } else {
      await this.keyv.set(key, value)
    }
  }

  async delete(key: string): Promise<boolean> {
    return this.keyv.delete(key)
  }
}
