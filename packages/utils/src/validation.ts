/**
 * Validation utilities for Linked All
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Basic validation - adjust for specific countries
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s-()]/g, ""));
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidPassword = (password: string): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim();
};

export const isValidSKU = (sku: string): boolean => {
  // SKU should be alphanumeric with optional hyphens/underscores
  const skuRegex = /^[A-Z0-9-_]+$/i;
  return skuRegex.test(sku);
};

export const isValidPostalCode = (postalCode: string, country: string): boolean => {
  const patterns: Record<string, RegExp> = {
    NG: /^\d{6}$/, // Nigeria
    KE: /^\d{5}$/, // Kenya
    GH: /^[A-Z]{2}\d{5}$/, // Ghana
    ZA: /^\d{4}$/, // South Africa
    US: /^\d{5}(-\d{4})?$/,
  };
  
  const pattern = patterns[country];
  return pattern ? pattern.test(postalCode) : true;
};
