import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { NgIf } from '@angular/common';
import { filter, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  template: `
    <header class="app-header navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">ECommerceUI</a>
        <div class="ms-auto">
          <a *ngIf="!isOnCart" class="btn btn-link" routerLink="/cart">Cart</a>
          <a *ngIf="isOnCart" class="btn btn-link" routerLink="/">Products</a>
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
export class HeaderComponent implements OnInit, OnDestroy {
  isOnCart = false;
  private destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Track route changes to determine if we're on cart page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      this.isOnCart = event.url.includes('/cart');
    });

    // Set initial state
    this.isOnCart = this.router.url.includes('/cart');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
