import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./features/products/pages/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'products', loadComponent: () => import('./features/products/pages/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'logout', loadComponent: () => import('./features/auth/logout/logout.component').then(m => m.LogoutComponent) },
  { path: 'cart', loadComponent: () => import('./features/cart/pages/cart-page/cart-page.component').then(m => m.CartPageComponent) },
  { path: 'products/:id', loadComponent: () => import('./features/products/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: '**', redirectTo: '' }
];
