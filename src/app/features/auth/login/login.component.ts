import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.auth.login(this.model.email, this.model.password)) {
      this.router.navigate(['/']);
    }
  }
}
