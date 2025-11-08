/**
 * @linked-all/events
 * Event streaming and messaging for Linked All
 */

export * from "./kafka-client";

// Default exports
export {
  getKafkaClient,
  getProducer,
  createConsumer,
  connectProducer,
  disconnectProducer,
  publishEvent,
  subscribeToEvents,
  EventType,
  Event,
} from "./kafka-client";

