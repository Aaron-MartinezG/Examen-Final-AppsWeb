import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);

  constructor(private router: Router) { }

  login(usuario: string, clave: string): boolean {
    if (usuario === 'hortencia' && clave === 'contadora123') {
      this.isLoggedIn.set(true);
      this.router.navigate(['/inicio']);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
