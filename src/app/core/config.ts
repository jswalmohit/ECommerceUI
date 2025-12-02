/**
 * Configuration for API endpoints that require JWT token authentication
 */
export const PROTECTED_URLS: string[] = [
  '/api/Cart',           // Cart related endpoints
  '/api/Orders',         // Orders endpoints
  '/api/Profile',        // Profile endpoints
  '/api/Wishlist',       // Wishlist endpoints
  '/api/User'            // User related endpoints
];

/**
 * Check if a URL requires JWT token authentication
 * @param url - The API endpoint URL
 * @returns true if the URL is in the protected list
 */
export function isProtectedUrl(url: string): boolean {
  return PROTECTED_URLS.some(protectedUrl => url.includes(protectedUrl));
}
