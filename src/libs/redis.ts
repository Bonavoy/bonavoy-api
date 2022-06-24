import Redis from "ioredis";

const redisClient = new Redis(
  "redis-18821.c1.us-west-2-2.ec2.cloud.redislabs.com:18821"
);


export default redisClient;
