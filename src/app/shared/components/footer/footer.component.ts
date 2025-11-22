import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="app-footer bg-light mt-4 py-3">
      <div class="container text-center small">© 2025 ECommerceUI</div>
    </footer>
  `
})
export class FooterComponent {}
