import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  private labelsSubject = new BehaviorSubject<any>(null);
  public labels$ = this.labelsSubject.asObservable();
  private labels: any = null;

  constructor(private http: HttpClient) {
    this.loadLabels();
  }

  private loadLabels(): void {
    this.http.get('/assets/labels.json').pipe(
      tap((labels: any) => {
        this.labels = labels;
        this.labelsSubject.next(labels);
      })
    ).subscribe({
      error: (err) => {
        console.error('Failed to load labels:', err);
        this.labelsSubject.next({});
      }
    });
  }

  getLabel(path: string): string {
    if (!this.labels) return path;
    const keys = path.split('.');
    let value: any = this.labels;
    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  }

  getLabels(): any {
    return this.labels || {};
  }
}
