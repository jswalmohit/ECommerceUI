import { Injectable } from '@angular/core';

/**
 * ToastService intentionally left as no-op to remove UI toasts globally.
 * Methods remain to avoid breaking imports in other modules.
 */
export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  // No-op observable placeholder for compatibility
  toast$ = null as any;

  showError(_message: string) {
    // intentionally no-op
  }

  showSuccess(_message: string) {
    // intentionally no-op
  }
}
