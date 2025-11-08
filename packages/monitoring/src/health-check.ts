/**
 * Health Check Utilities
 * Service health checking and reporting
 */

import { setServiceHealth } from "./metrics";

export interface HealthCheckResult {
  status: "healthy" | "unhealthy";
  service: string;
  timestamp: Date;
  checks: {
    [key: string]: {
      status: "up" | "down";
      message?: string;
      latency?: number;
    };
  };
}

/**
 * Health check for database
 */
export async function checkDatabase(connectionTest: () => Promise<boolean>): Promise<{
  status: "up" | "down";
  message?: string;
  latency?: number;
}> {
  const start = Date.now();
  try {
    const isConnected = await connectionTest();
    const latency = Date.now() - start;

    if (isConnected) {
      return { status: "up", latency };
    }

    return { status: "down", message: "Database connection failed", latency };
  } catch (error: any) {
    const latency = Date.now() - start;
    return {
      status: "down",
      message: error.message || "Database check failed",
      latency,
    };
  }
}

/**
 * Health check for cache (Redis)
 */
export async function checkCache(
  cacheTest: () => Promise<boolean>
): Promise<{
  status: "up" | "down";
  message?: string;
  latency?: number;
}> {
  const start = Date.now();
  try {
    const isAvailable = await cacheTest();
    const latency = Date.now() - start;

    if (isAvailable) {
      return { status: "up", latency };
    }

    return { status: "down", message: "Cache not available", latency };
  } catch (error: any) {
    const latency = Date.now() - start;
    return {
      status: "down",
      message: error.message || "Cache check failed",
      latency,
    };
  }
}

/**
 * Health check for external services
 */
export async function checkExternalService(
  serviceName: string,
  healthCheck: () => Promise<boolean>
): Promise<{
  status: "up" | "down";
  message?: string;
  latency?: number;
}> {
  const start = Date.now();
  try {
    const isHealthy = await healthCheck();
    const latency = Date.now() - start;

    if (isHealthy) {
      return { status: "up", latency };
    }

    return { status: "down", message: `${serviceName} is not healthy`, latency };
  } catch (error: any) {
    const latency = Date.now() - start;
    return {
      status: "down",
      message: error.message || `${serviceName} check failed`,
      latency,
    };
  }
}

/**
 * Create comprehensive health check
 */
export async function createHealthCheck(
  serviceName: string,
  checks: {
    database?: () => Promise<boolean>;
    cache?: () => Promise<boolean>;
    [key: string]: (() => Promise<boolean>) | undefined;
  }
): Promise<HealthCheckResult> {
  const healthChecks: HealthCheckResult["checks"] = {};

  // Check database
  if (checks.database) {
    healthChecks.database = await checkDatabase(checks.database);
  }

  // Check cache
  if (checks.cache) {
    healthChecks.cache = await checkCache(checks.cache);
  }

  // Check other services
  for (const [key, check] of Object.entries(checks)) {
    if (key !== "database" && key !== "cache" && check) {
      healthChecks[key] = await checkExternalService(key, check);
    }
  }

  // Determine overall status
  const allUp = Object.values(healthChecks).every((check) => check.status === "up");
  const status = allUp ? "healthy" : "unhealthy";

  // Update metrics
  setServiceHealth(serviceName, allUp);

  return {
    status,
    service: serviceName,
    timestamp: new Date(),
    checks: healthChecks,
  };
}

