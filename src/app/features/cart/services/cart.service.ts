import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  /**
   * Add a product to cart
   * JWT token will be automatically added by authInterceptor
   * @param productId - The ID of the product to add
   * @param quantity - The quantity of the product to add
   */
  addToCart(productId: string, quantity: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/api/Cart/add`;
    const headers = new HttpHeaders({
      'CorrelationId': this.generateCorrelationId(),
      'AuthToken': this.tokenService.getToken() || ''
    });

    return this.http.post<any>(url, { productId, quantity }, { headers });
  }

  /**
   * Get all cart items
   * JWT token will be automatically added by authInterceptor
   */
  getCartItems(): Observable<any> {
    const url = `${environment.apiBaseUrl}/api/Cart/items`;
    const headers = new HttpHeaders({
      'CorrelationId': this.generateCorrelationId()
    });

    return this.http.get<any>(url, { headers });
  }

  /**
   * Remove item from cart
   * JWT token will be automatically added by authInterceptor
   */
  removeFromCart(productId: string): Observable<any> {
    const url = `${environment.apiBaseUrl}/api/Cart/remove/${productId}`;
    const headers = new HttpHeaders({
      'CorrelationId': this.generateCorrelationId()
    });

    return this.http.delete<any>(url, { headers });
  }

  /**
   * Clear cart
   * JWT token will be automatically added by authInterceptor
   */
  clearCart(): Observable<any> {
    const url = `${environment.apiBaseUrl}/api/Cart/clear`;
    const headers = new HttpHeaders({
      'CorrelationId': this.generateCorrelationId()
    });

    return this.http.post<any>(url, {}, { headers });
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
