import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  constructor(private authService: AuthService) { }

  // Función que llama al servicio para cerrar sesión
  onLogout() {
    this.authService.logout();
  }
}
