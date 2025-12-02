import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  public toast$: Observable<ToastMessage | null> = this.toastSubject.asObservable();

  showError(message: string): void {
    this.showToast(message, 'error');
  }

  showSuccess(message: string): void {
    this.showToast(message, 'success');
  }

  showInfo(message: string): void {
    this.showToast(message, 'info');
  }

  showWarning(message: string): void {
    this.showToast(message, 'warning');
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    console.log('Toast shown:', { message, type });
    this.toastSubject.next({ message, type });
    // Auto-dismiss after 3500ms to allow animation to complete
    setTimeout(() => {
      console.log('Toast dismissed');
      this.toastSubject.next(null);
    }, 3500);
  }
}

