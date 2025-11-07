import type { FastifyInstance } from "fastify";
import { registerUser, loginUser, getUserById } from "../lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(fastify: FastifyInstance) {
  // Register new user
  fastify.post("/register", async (request, reply) => {
    try {
      const body = registerSchema.parse(request.body);

      const result = await registerUser(
        body.email,
        body.password,
        body.phoneNumber,
        body.firstName,
        body.lastName
      );

      return {
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          phoneNumber: result.user.phone_number,
          role: result.user.role,
          firstName: result.user.first_name,
          lastName: result.user.last_name,
        },
        session: {
          accessToken: result.session.access_token,
          refreshToken: result.session.refresh_token,
          expiresAt: result.session.expires_at,
        },
      };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          success: false,
          error: "Validation error",
          details: error.errors,
        });
      }

      reply.code(400).send({
        success: false,
        error: error.message || "Registration failed",
      });
    }
  });

  // Login user
  fastify.post("/login", async (request, reply) => {
    try {
      const body = loginSchema.parse(request.body);

      const result = await loginUser(body.email, body.password);

      return {
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          phoneNumber: result.user.phone_number,
          role: result.user.role,
          firstName: result.user.first_name,
          lastName: result.user.last_name,
        },
        session: {
          accessToken: result.session.access_token,
          refreshToken: result.session.refresh_token,
          expiresAt: result.session.expires_at,
        },
      };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          success: false,
          error: "Validation error",
          details: error.errors,
        });
      }

      reply.code(401).send({
        success: false,
        error: error.message || "Invalid credentials",
      });
    }
  });

  // Get current user
  fastify.get("/me", async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        return reply.code(401).send({
          success: false,
          error: "Unauthorized",
        });
      }

      const { verifyToken } = await import("../lib/auth");
      const user = await verifyToken(token);

      if (!user) {
        return reply.code(401).send({
          success: false,
          error: "Invalid token",
        });
      }

      const userData = await getUserById(user.id);

      return {
        success: true,
        user: {
          id: userData.id,
          email: userData.email,
          phoneNumber: userData.phone_number,
          role: userData.role,
          firstName: userData.first_name,
          lastName: userData.last_name,
          status: userData.status,
          createdAt: userData.created_at,
        },
      };
    } catch (error: any) {
      reply.code(500).send({
        success: false,
        error: error.message || "Failed to get user",
      });
    }
  });

  // Logout (client-side token invalidation, but we can track it)
  fastify.post("/logout", async (request, reply) => {
    // In a stateless JWT system, logout is typically handled client-side
    // by removing the token. We can add token blacklisting here if needed.
    return {
      success: true,
      message: "Logged out successfully",
    };
  });

  // Refresh token
  fastify.post("/refresh", async (request, reply) => {
    try {
      const { refreshToken } = z
        .object({
          refreshToken: z.string(),
        })
        .parse(request.body);

      const { createUserClient } = await import("../lib/supabase");
      const userClient = createUserClient();

      const {
        data: sessionData,
        error,
      } = await userClient.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error || !sessionData.session) {
        return reply.code(401).send({
          success: false,
          error: "Invalid refresh token",
        });
      }

      return {
        success: true,
        session: {
          accessToken: sessionData.session.access_token,
          refreshToken: sessionData.session.refresh_token,
          expiresAt: sessionData.session.expires_at,
        },
      };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          success: false,
          error: "Validation error",
          details: error.errors,
        });
      }

      reply.code(500).send({
        success: false,
        error: error.message || "Failed to refresh token",
      });
    }
  });
}
