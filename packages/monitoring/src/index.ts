/**
 * @linked-all/monitoring
 * Monitoring and metrics for Linked All services
 */

export * from "./metrics";
export * from "./health-check";

// Default exports
export { register, getMetrics } from "./metrics";
export {
  createHealthCheck,
  checkDatabase,
  checkCache,
  checkExternalService,
} from "./health-check";

