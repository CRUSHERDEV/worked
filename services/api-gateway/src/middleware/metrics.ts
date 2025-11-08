/**
 * Metrics Middleware
 * Records HTTP request metrics for monitoring
 */

import { FastifyRequest, FastifyReply } from "fastify";
import { recordHttpRequest } from "@linked-all/monitoring";

export async function metricsMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const start = Date.now();

  reply.addHook("onSend", async (request, reply) => {
    const duration = (Date.now() - start) / 1000; // Convert to seconds
    const method = request.method;
    const route = request.routerPath || request.url;
    const statusCode = reply.statusCode;

    recordHttpRequest(method, route, statusCode, duration);
  });
}

