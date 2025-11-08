/**
 * Kafka Client
 * Event streaming client for Linked All
 */

import { Kafka, Producer, Consumer, KafkaConfig, ProducerConfig, ConsumerConfig } from "kafkajs";

export interface EventConfig {
  brokers?: string[];
  clientId?: string;
  retry?: {
    retries?: number;
    initialRetryTime?: number;
    multiplier?: number;
    maxRetryTime?: number;
  };
}

const defaultConfig: EventConfig = {
  brokers: process.env.KAFKA_BROKERS?.split(",") || ["localhost:9092"],
  clientId: process.env.KAFKA_CLIENT_ID || "linked-all-client",
  retry: {
    retries: 8,
    initialRetryTime: 100,
    multiplier: 2,
    maxRetryTime: 30000,
  },
};

let kafkaInstance: Kafka | null = null;
let producerInstance: Producer | null = null;

/**
 * Get or create Kafka instance
 */
export function getKafkaClient(config?: EventConfig): Kafka {
  if (kafkaInstance) {
    return kafkaInstance;
  }

  const kafkaConfig: KafkaConfig = {
    brokers: config?.brokers || defaultConfig.brokers,
    clientId: config?.clientId || defaultConfig.clientId,
    retry: config?.retry || defaultConfig.retry,
  };

  kafkaInstance = new Kafka(kafkaConfig);
  return kafkaInstance;
}

/**
 * Get or create Kafka producer
 */
export function getProducer(config?: EventConfig & ProducerConfig): Producer {
  if (producerInstance) {
    return producerInstance;
  }

  const kafka = getKafkaClient(config);
  producerInstance = kafka.producer({
    allowAutoTopicCreation: true,
    transactionTimeout: 30000,
    ...config,
  });

  return producerInstance;
}

/**
 * Create Kafka consumer
 */
export function createConsumer(
  groupId: string,
  config?: EventConfig & ConsumerConfig
): Consumer {
  const kafka = getKafkaClient(config);
  return kafka.consumer({
    groupId,
    ...config,
  });
}

/**
 * Connect producer
 */
export async function connectProducer(config?: EventConfig): Promise<Producer> {
  const producer = getProducer(config);
  await producer.connect();
  return producer;
}

/**
 * Disconnect producer
 */
export async function disconnectProducer(): Promise<void> {
  if (producerInstance) {
    await producerInstance.disconnect();
    producerInstance = null;
  }
}

// Event Types
export enum EventType {
  // User Events
  USER_CREATED = "user.created",
  USER_UPDATED = "user.updated",
  USER_LOGIN = "user.login",
  USER_LOGOUT = "user.logout",

  // Order Events
  ORDER_CREATED = "order.created",
  ORDER_CONFIRMED = "order.confirmed",
  ORDER_SHIPPED = "order.shipped",
  ORDER_DELIVERED = "order.delivered",
  ORDER_CANCELLED = "order.cancelled",

  // Payment Events
  PAYMENT_INITIATED = "payment.initiated",
  PAYMENT_COMPLETED = "payment.completed",
  PAYMENT_FAILED = "payment.failed",
  PAYMENT_REFUNDED = "payment.refunded",

  // Product Events
  PRODUCT_CREATED = "product.created",
  PRODUCT_UPDATED = "product.updated",
  PRODUCT_OUT_OF_STOCK = "product.out_of_stock",
  PRODUCT_PRICE_CHANGED = "product.price_changed",
}

export interface Event {
  type: EventType | string;
  payload: any;
  timestamp: Date;
  source: string;
  correlationId?: string;
}

/**
 * Publish event to Kafka
 */
export async function publishEvent(
  topic: string,
  event: Event,
  config?: EventConfig
): Promise<void> {
  try {
    const producer = await connectProducer(config);

    await producer.send({
      topic,
      messages: [
        {
          key: event.correlationId || event.type,
          value: JSON.stringify({
            ...event,
            timestamp: event.timestamp.toISOString(),
          }),
        },
      ],
    });
  } catch (error) {
    console.error(`Failed to publish event ${event.type} to topic ${topic}:`, error);
    throw error;
  }
}

/**
 * Subscribe to events from Kafka
 */
export async function subscribeToEvents(
  topic: string,
  groupId: string,
  handler: (event: Event) => Promise<void>,
  config?: EventConfig
): Promise<void> {
  const consumer = createConsumer(groupId, config);

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const event: Event = JSON.parse(message.value?.toString() || "{}");
        event.timestamp = new Date(event.timestamp);
        await handler(event);
      } catch (error) {
        console.error(`Error processing message from topic ${topic}:`, error);
      }
    },
  });
}

