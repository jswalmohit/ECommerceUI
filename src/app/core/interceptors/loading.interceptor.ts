import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { TokenService } from '../services/token.service';
import { isProtectedUrl } from '../config';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService);

  loader.show();

  return next(req).pipe(
    finalize(() => loader.hide())
  );
};

/**
 * Auth Interceptor - Adds JWT token only to protected endpoints
 * Check config.ts for the list of protected URLs
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  // Add Authorization header only if:
  // 1. Token exists
  // 2. URL is in the protected URLs list
  if (token && isProtectedUrl(req.url)) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};