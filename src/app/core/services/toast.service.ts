import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _toast$ = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this._toast$.asObservable();

  showError(message: string) {
    this._show(message, 'error');
  }

  showSuccess(message: string) {
    this._show(message, 'success');
  }

  private _show(message: string, type: ToastMessage['type']) {
    this._toast$.next({ message, type });

    setTimeout(() => {
      this._toast$.next(null);   // auto-hide after 3 sec
    }, 3000);
  }
}
