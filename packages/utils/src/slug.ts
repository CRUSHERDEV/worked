/**
 * Slug generation utilities for Linked All
 */

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const generateUniqueSlug = (text: string, existingSlugs: string[]): string => {
  let slug = generateSlug(text);
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(text)}-${counter}`;
    counter++;
  }
  
  return slug;
};

export const generateProductSlug = (name: string, sku?: string): string => {
  let slug = generateSlug(name);
  
  if (sku) {
    slug = `${slug}-${sku.toLowerCase()}`;
  }
  
  return slug;
};
