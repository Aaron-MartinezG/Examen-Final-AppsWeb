import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = 'FrontendContabilidad';

  // Inyectar el servicio de autenticación
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    // Esto asegura que al cargar la app, si no está logueado, vaya al login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
