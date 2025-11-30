import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(productId: string): Observable<any> {
    const url = `${environment.apiBaseUrl}/api/Cart/add`;
    const headers = new HttpHeaders({
      'CorrelationId': this.generateCorrelationId(),
      'AuthToken': `Bearer ${localStorage.getItem('user_token') || ''}`
    });

    return this.http.post<any>(url, { productId }, { headers });
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
