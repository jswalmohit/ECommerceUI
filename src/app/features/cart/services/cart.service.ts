import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.loadCartCount();
  }

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
    const url = `${environment.apiBaseUrl}/api/Cart/get-cart-items`;
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

  /**
   * Update cart count
   */
  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  /**
   * Load cart count from local storage or API
   */
  private loadCartCount(): void {
    const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
      this.cartCountSubject.next(parseInt(savedCount, 10));
    }
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

