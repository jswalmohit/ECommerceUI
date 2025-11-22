import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule, FormsModule, LoginComponent, RegisterComponent, RouterModule.forChild([
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ])]
})
export class AuthModule {}
