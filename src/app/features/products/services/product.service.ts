import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  getProducts(): Observable<any[]> {
    // Ensure we have valid values for headers
    const correlationIdValue = this.generateCorrelationId();
    const authTokenValue = localStorage.getItem('user_token')??correlationIdValue;
    
    // Use HttpHeaders fluent API to set headers
    let headers = new HttpHeaders();
    
    if (correlationIdValue) {
      headers = headers.set('CorrelationId', correlationIdValue);
    }
    
    if (authTokenValue) {
      headers = headers.set('AuthToken', authTokenValue);
    }
    
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/products`, { headers });
  }

  private generateCorrelationId(): string {
    // Generate a unique correlation ID (you can customize this logic)
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

}