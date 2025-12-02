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

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
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
