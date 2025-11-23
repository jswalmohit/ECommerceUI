import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { RegisterModel } from '../../../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // form-backed model fields
  model: {
    loginId: string;
    email: string;
    fullName: string;
    password: string;
  } = {
    loginId: '',
    email: '',
    fullName: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  submit() {
    const payload: RegisterModel = {
      loginId: this.model.loginId,
      email: this.model.email,
      fullName: this.model.fullName,
      credentials: {
        password: this.model.password
      }
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.toast.showSuccess('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.toast.showError('Registration failed. Please try again.');
      }
    });
  }
}
