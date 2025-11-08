/**
 * Prometheus Metrics
 * Collects and exports metrics for monitoring
 */

import { Registry, Counter, Histogram, Gauge, collectDefaultMetrics } from "prom-client";

// Create a Registry to register the metrics
export const register = new Registry();

// Add default metrics (CPU, memory, etc.)
collectDefaultMetrics({ register });

// HTTP Request Metrics
export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
  registers: [register],
});

export const httpRequestTotal = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

// Database Metrics
export const dbQueryDuration = new Histogram({
  name: "db_query_duration_seconds",
  help: "Duration of database queries in seconds",
  labelNames: ["operation", "table"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2],
  registers: [register],
});

export const dbQueryTotal = new Counter({
  name: "db_queries_total",
  help: "Total number of database queries",
  labelNames: ["operation", "table", "status"],
  registers: [register],
});

// Cache Metrics
export const cacheHits = new Counter({
  name: "cache_hits_total",
  help: "Total number of cache hits",
  labelNames: ["cache_key"],
  registers: [register],
});

export const cacheMisses = new Counter({
  name: "cache_misses_total",
  help: "Total number of cache misses",
  labelNames: ["cache_key"],
  registers: [register],
});

export const cacheOperationDuration = new Histogram({
  name: "cache_operation_duration_seconds",
  help: "Duration of cache operations in seconds",
  labelNames: ["operation"],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1],
  registers: [register],
});

// Business Metrics
export const ordersCreated = new Counter({
  name: "orders_created_total",
  help: "Total number of orders created",
  labelNames: ["status"],
  registers: [register],
});

export const paymentsProcessed = new Counter({
  name: "payments_processed_total",
  help: "Total number of payments processed",
  labelNames: ["status", "method"],
  registers: [register],
});

export const activeUsers = new Gauge({
  name: "active_users",
  help: "Number of active users",
  registers: [register],
});

// Service Health Metrics
export const serviceHealth = new Gauge({
  name: "service_health",
  help: "Service health status (1 = healthy, 0 = unhealthy)",
  labelNames: ["service"],
  registers: [register],
});

// Error Metrics
export const errorsTotal = new Counter({
  name: "errors_total",
  help: "Total number of errors",
  labelNames: ["type", "service"],
  registers: [register],
});

/**
 * Record HTTP request metrics
 */
export function recordHttpRequest(
  method: string,
  route: string,
  statusCode: number,
  duration: number
): void {
  httpRequestDuration.observe({ method, route, status_code: statusCode.toString() }, duration);
  httpRequestTotal.inc({ method, route, status_code: statusCode.toString() });
}

/**
 * Record database query metrics
 */
export function recordDbQuery(
  operation: string,
  table: string,
  duration: number,
  status: "success" | "error" = "success"
): void {
  dbQueryDuration.observe({ operation, table }, duration);
  dbQueryTotal.inc({ operation, table, status });
}

/**
 * Record cache operation metrics
 */
export function recordCacheHit(key: string): void {
  cacheHits.inc({ cache_key: key });
}

export function recordCacheMiss(key: string): void {
  cacheMisses.inc({ cache_key: key });
}

export function recordCacheOperation(operation: string, duration: number): void {
  cacheOperationDuration.observe({ operation }, duration);
}

/**
 * Record business metrics
 */
export function recordOrderCreated(status: string): void {
  ordersCreated.inc({ status });
}

export function recordPaymentProcessed(status: string, method: string): void {
  paymentsProcessed.inc({ status, method });
}

export function setActiveUsers(count: number): void {
  activeUsers.set(count);
}

export function setServiceHealth(service: string, healthy: boolean): void {
  serviceHealth.set({ service }, healthy ? 1 : 0);
}

export function recordError(type: string, service: string): void {
  errorsTotal.inc({ type, service });
}

/**
 * Get metrics as Prometheus format
 */
export async function getMetrics(): Promise<string> {
  return register.metrics();
}

