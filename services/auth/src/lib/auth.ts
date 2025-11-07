import { supabase, createUserClient } from "./supabase";
import type { User, UserRole } from "@linked-all/types";
import type { FastifyRequest } from "fastify";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
}

/**
 * Verify JWT token and get user info
 */
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const userClient = createUserClient(token);
    const {
      data: { user },
      error,
    } = await userClient.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    // Get user details from database
    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select("id, email, phone_number, role, status")
      .eq("id", user.id)
      .single();

    if (dbError || !userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      role: userData.role as UserRole,
      phoneNumber: userData.phone_number || undefined,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from request header
 */
export function extractToken(request: FastifyRequest): string | null {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Register a new user
 */
export async function registerUser(
  email: string,
  password: string,
  phoneNumber?: string,
  firstName?: string,
  lastName?: string
) {
  const userClient = createUserClient();

  // Create auth user
  const {
    data: authData,
    error: authError,
  } = await userClient.auth.signUp({
    email,
    password,
    phone: phoneNumber,
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message || "Failed to create user");
  }

  // Create user record in database
  const { data: userData, error: dbError } = await supabase
    .from("users")
    .insert({
      id: authData.user.id,
      email,
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
      role: "consumer",
      status: "active",
    })
    .select()
    .single();

  if (dbError) {
    // Rollback: delete auth user if database insert fails
    await userClient.auth.admin.deleteUser(authData.user.id);
    throw new Error(dbError.message);
  }

  return {
    user: userData,
    session: authData.session,
  };
}

/**
 * Login user
 */
export async function loginUser(email: string, password: string) {
  const userClient = createUserClient();

  const {
    data: authData,
    error: authError,
  } = await userClient.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user || !authData.session) {
    throw new Error(authError?.message || "Invalid credentials");
  }

  // Update last login
  await supabase
    .from("users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", authData.user.id);

  // Get user details
  const { data: userData } = await supabase
    .from("users")
    .select("id, email, phone_number, role, status, first_name, last_name")
    .eq("id", authData.user.id)
    .single();

  return {
    user: userData,
    session: authData.session,
  };
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
