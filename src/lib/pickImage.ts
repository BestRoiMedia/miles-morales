/**
 * Stable image picker for service area pages
 * Uses deterministic hashing to ensure the same slug always gets the same image
 */

import { SERVICE_AREA_IMAGES } from '@/data/serviceAreaImages';

/**
 * Manual image assignments for hubs to ensure uniqueness
 * Maps hub slugs to specific image indices
 */
const HUB_IMAGE_ASSIGNMENTS: Record<string, number> = {
  'chambersburg-pa': 0,
  'washington-dc': 1,
  'baltimore-md': 2,
  'philadelphia-pa': 3,
  'pittsburgh-pa': 4,
};

/**
 * Simple djb2-style hash function for deterministic index selection
 * @param str - String to hash
 * @returns Hash value
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Convert a slug to a stable index within a given length
 * @param slug - Slug string to hash
 * @param len - Maximum length (array size)
 * @returns Index between 0 and len-1
 */
export function hashSlugToIndex(slug: string, len: number): number {
  // Check if this is a hub with a manual assignment
  if (HUB_IMAGE_ASSIGNMENTS[slug] !== undefined) {
    return HUB_IMAGE_ASSIGNMENTS[slug]! % len;
  }
  
  // For city pages and other slugs, use hash
  const hash = hashString(slug);
  return hash % len;
}

/**
 * Pick a stable image for a given slug
 * @param slug - Slug to use as seed (e.g., "chambersburg-pa" or "chambersburg-pa/waynesboro-pa")
 * @returns Image object with src and altBase
 */
export function pickImageForSlug(slug: string): { src: string; altBase: string } {
  const index = hashSlugToIndex(slug, SERVICE_AREA_IMAGES.length);
  return SERVICE_AREA_IMAGES[index]!;
}

