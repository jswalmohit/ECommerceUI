import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private counter = signal(0);

  show() {
    this.counter.update(n => n + 1);
  }

  hide() {
    this.counter.update(n => Math.max(0, n - 1));
  }

  isLoading() {
    return this.counter() > 0;
  }
}