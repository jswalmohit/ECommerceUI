import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly KEY = 'ecommerceui_auth_user';

  constructor() {}

  login(email: string, password: string) {
    const u = localStorage.getItem(this.KEY);
    if (u) {
      try {
        const user = JSON.parse(u) as { email: string; password: string };
        return user.email === email && user.password === password;
      } catch {
        return false;
      }
    }
    return false;
  }

  register(model: { name: string; email: string; password: string }) {
    localStorage.setItem(this.KEY, JSON.stringify(model));
    return true;
  }
}
