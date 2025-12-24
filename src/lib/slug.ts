/**
 * Slug utility functions
 */

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Create a city slug from name and state
 */
export function createCitySlug(name: string, state: string): string {
  return `${slugify(name)}-${state.toLowerCase()}`;
}

/**
 * Create a hub slug from name and state
 */
export function createHubSlug(name: string, state: string): string {
  return `${slugify(name)}-${state.toLowerCase()}`;
}

