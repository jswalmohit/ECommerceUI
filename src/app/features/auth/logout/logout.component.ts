import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h3>Logout</h3>
      <p>Click the button below to end your session.</p>
      <button class="btn btn-danger" (click)="logout()">Logout</button>
    </div>
  `
})
export class LogoutComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  logout() {    
    this.auth.logout();
    this.toast.showSuccess('You have been logged out');
    this.router.navigate(['']);
  }
}
