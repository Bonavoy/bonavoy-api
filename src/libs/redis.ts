import { createClient } from 'redis'

// connect to redis
const redis_client = createClient({
  url: `redis://default:S5ie0zd00Fi1nDvAqiFgONvUWVlkxkp7@redis-18821.c1.us-west-2-2.ec2.cloud.redislabs.com:18821`,
})

redis_client.on('connect', function () {
  console.log('redis client connected')
})

export default redis_client
