import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'user_token';

  constructor() { }
  setLocalStorageWithExpiry(key: string, value: any, ttlMinutes: number) {
    const now = new Date().getTime();

    const item = {
      value: value,
      expiry: now + ttlMinutes * 60 * 1000
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  getWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      // Try to parse as JSON object with expiry
      const item = JSON.parse(itemStr);
      console.log('Parsed item from localStorage:', item);
      
      const now = new Date().getTime();

      if (now > item.expiry) {
        localStorage.removeItem(key);
        console.log('Token expired, removed from localStorage');
        return null;
      }

      console.log('Token is valid, returning value:', item.value);
      return item.value;
    } catch (e) {
      // If JSON parse fails, treat as plain string (e.g., JWT token)
      console.log('Could not parse as JSON, treating as plain string:', itemStr);
      console.log('Error details:', e);
      return itemStr;
    }
  }

  /**
   * Get the stored JWT token
   */
  getToken(): string | null {
    return this.getWithExpiry(this.TOKEN_KEY);
  }

  /**
   * Set the JWT token
   */
  setToken(token: string): void {
    return this.setLocalStorageWithExpiry(this.TOKEN_KEY, token,environment.tokenExpirationMinutes);
  }

  /**
   * Remove the JWT token
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Check if token exists
   */
  hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
