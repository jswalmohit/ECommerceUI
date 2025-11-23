import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    if (this.auth.login(email!, password!)) {
      this.auth.login(email!, password!).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
