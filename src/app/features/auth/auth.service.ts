import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'user_token';
  private readonly BASE_URL = 'https://ecommerceapp-m981.onrender.com';
  private readonly API_URL = this.BASE_URL + '/api/Auth/token';

  constructor() {}

login(uId: string, password: string) {
  const correlationId = crypto.randomUUID();

  const headers = {
    'CorrelationId': correlationId
  };

  return this.http.post<{ token: string }>(
    `${this.API_URL}`,
    { loginId : uId, password },
    { headers }
  ).pipe(
    tap(res => {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem('correlation_id', correlationId); 
    })
  );
}

  register(model: { name: string; email: string; password: string }) {
    return this.http.post(`${this.API_URL}/register`, model);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
