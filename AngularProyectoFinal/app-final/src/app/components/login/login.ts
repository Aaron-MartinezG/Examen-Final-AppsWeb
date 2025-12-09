import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  model = {
    usuario: '',
    clave: ''
  };
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Si la aplicación arranca y el usuario ya está logueado, vamos a inicio.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/inicio']);
    }
  }

  onSubmit() {
    this.loginError = null;

    if (this.authService.login(this.model.usuario, this.model.clave)) {
      // Éxito, la redirección ocurre en el AuthService
    } else {
      this.loginError = 'Usuario o contraseña incorrectos. Intenta con "hortencia" y "contadora123".';
    }
  }
}
