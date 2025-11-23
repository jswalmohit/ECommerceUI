import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'user_token';

  constructor() {}

login(uId: string, password: string) {
    const headers = new HttpHeaders({
      'CorrelationId': crypto.randomUUID()
    });
  return this.http.post<{ token: string }>(
    `${environment.apiBaseUrl}/api/Auth/token`,
    { loginId : uId, password },
    { headers: headers }
  ).pipe(
    tap(res => {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem('correlation_id', headers.get('CorrelationId')!); 
    })
  );
}

  register(model: any) {
       const headers = new HttpHeaders({
      'CorrelationId': crypto.randomUUID()
    });
    return this.http.post(`${environment.apiBaseUrl}/api/Register/create`, model, { headers: headers });
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
