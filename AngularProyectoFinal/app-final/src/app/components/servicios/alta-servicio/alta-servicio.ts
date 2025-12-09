import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../../services/servicio-service';
import { Servicio } from '../../../models/servicio.model';
import { HttpErrorResponse } from '@angular/common/http'; // Importar para tipado de errores

@Component({
  selector: 'app-alta-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alta-servicio.html',
  styleUrl: './alta-servicio.scss',
})
export class AltaServicio implements OnInit {

  model: Servicio = this.resetModel();
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    // Inicialización
  }

  resetModel(): Servicio {
    return {
      nombre: '',
      descripcion: '',
      precio_base: 0
    };
  }

  onSubmit(form: NgForm): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (form.invalid) {
      this.mensajeError = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    const nuevoServicio: Servicio = this.model;

    // Llama al servicio POST para enviar los datos a Node.js
    this.servicioService.registrarServicio(nuevoServicio).subscribe({
      next: (response: any) => {
        this.mensajeExito = `Servicio '${nuevoServicio.nombre}' registrado con éxito.`;
        this.model = this.resetModel();
        form.resetForm(this.model);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al registrar servicio:', err);
        this.mensajeError = `Error: ${err.error?.message || 'Error al conectar con el servidor.'}`;
      }
    });
  }
}
