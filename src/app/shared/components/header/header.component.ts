import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  template: `
    <header class="app-header navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">ECommerceUI</a>
        <div class="ms-auto">
          <a class="btn btn-link" routerLink="/">Products</a>
          <a *ngIf="!isLoggedIn" class="btn btn-link" routerLink="/login">Login</a>
          <a *ngIf="isLoggedIn" class="btn btn-link" routerLink="/logout">Logout</a>
          <a *ngIf="!isLoggedIn" class="btn btn-link" routerLink="/register">Register</a>
        </div>
      </div>
    </header>
  `,
  styles: [
    `:host{display:block}`
  ]
})
export class HeaderComponent {
  constructor(private auth: AuthService) {}

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
