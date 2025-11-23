import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading.isLoading()" class="backdrop">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent {
  loading = inject(LoadingService);
}
