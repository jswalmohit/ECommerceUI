import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  model = { name: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.auth.register(this.model)) {
      this.router.navigate(['/']);
    }
  }
}
