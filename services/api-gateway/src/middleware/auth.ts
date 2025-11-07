import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "@linked-all/auth-service/src/lib/auth";

export interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    id: string;
    email: string;
    role: string;
    phoneNumber?: string;
  };
}

/**
 * Authentication middleware
 */
export async function authenticate(
  request: AuthenticatedRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.code(401).send({
      success: false,
      error: "Unauthorized",
      message: "Missing or invalid authorization header",
    });
  }

  const token = authHeader.substring(7);

  try {
    // In a real implementation, you'd verify the token here
    // For now, we'll skip actual verification since services handle their own auth
    // This is a placeholder that can be enhanced later
    request.user = {
      id: "user-id",
      email: "user@example.com",
      role: "consumer",
    };

    // Uncomment when auth service is properly integrated:
    // const user = await verifyToken(token);
    // if (!user) {
    //   return reply.code(401).send({
    //     success: false,
    //     error: "Unauthorized",
    //     message: "Invalid token",
    //   });
    // }
    // request.user = user;
  } catch (error) {
    return reply.code(401).send({
      success: false,
      error: "Unauthorized",
      message: "Token verification failed",
    });
  }
}

/**
 * Require specific role
 */
export function requireRole(role: string) {
  return async (request: AuthenticatedRequest, reply: FastifyReply) => {
    await authenticate(request, reply);

    if (!request.user || request.user.role !== role) {
      return reply.code(403).send({
        success: false,
        error: "Forbidden",
        message: `Requires ${role} role`,
      });
    }
  };
}
