import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

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
      this.tokenService.setToken(res.token);
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
    this.tokenService.removeToken();
  }

  get token(): string | null {
    return this.tokenService.getToken();
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }
}
