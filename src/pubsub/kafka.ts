import { Kafka } from 'kafkajs'
import { KafkaPubSub } from 'graphql-kafkajs-subscriptions'

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER!],
  sasl: {
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
    mechanism: 'plain',
  },
  ssl: true,
})

export const transportationPubSub = KafkaPubSub.create({
  topic: process.env.KAFKA_TRANSPORTATION_STREAM_TOPIC!,
  kafka,
  groupIdPrefix: process.env.KAFKA_GROUP_ID_PREFIX!, // used for kafka pub/sub,
})
