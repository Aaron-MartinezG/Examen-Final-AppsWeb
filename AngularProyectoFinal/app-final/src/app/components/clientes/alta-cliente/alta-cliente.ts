import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente-service';
import { ServicioService } from '../../../services/servicio-service';
import { Cliente } from '../../../models/cliente.model';
import { Servicio } from '../../../models/servicio.model';
import { HttpErrorResponse } from '@angular/common/http'; // Importar para tipado de errores

// La interfaz ClienteModel es un alias de Cliente
type ClienteModel = Cliente;

@Component({
  selector: 'app-alta-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alta-cliente.html',
  styleUrl: './alta-cliente.scss'
})
export class AltaClienteComponent implements OnInit {
  model: ClienteModel = this.resetModel();

  // Ahora tipamos la lista como Servicio[] y la dejamos vacía
  servicios: Servicio[] = [];

  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService // Inyectar ServicioService
  ) { }

  ngOnInit(): void {
    // 1. Llamar al método de carga al inicializar
    this.cargarServicios();
  }

  /**
   * Obtiene la lista real de servicios desde el API
   */
  private cargarServicios(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (data: Servicio[]) => {
        // Asigna los servicios reales obtenidos del backend
        this.servicios = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error cargando servicios:', err);
        this.mensajeError = 'No se pudo cargar el catálogo de servicios desde la API.';
      }
    });
  }

  resetModel(): ClienteModel {
    const today = new Date().toISOString().substring(0, 10);
    return {
      nombre: '',
      empresa: '',
      correo: '',
      telefono: '',
      rfc: '',
      honorarios_mensuales: 0,
      fecha_inicio: today,
      activo: true,
      id_servicio: 0
    } as ClienteModel;
  }

  onSubmit(form: NgForm): void {
    // ... (Tu lógica de envío POST) ...
    this.mensajeExito = null;
    this.mensajeError = null;

    if (form.invalid) {
      this.mensajeError = 'Por favor, corrige los errores en los campos obligatorios.';
      return;
    }

    const nuevoCliente: Cliente = this.model;

    this.clienteService.registrarCliente(nuevoCliente).subscribe({
      next: (response: any) => {
        this.mensajeExito = `Cliente ${nuevoCliente.nombre} registrado con ID: ${response.id || 'N/A'}.`;

        this.model = this.resetModel();
        form.resetForm(this.model);
      },
      error: (err: HttpErrorResponse) => {
        this.mensajeError = `Error al registrar: ${err.error?.message || 'Verifica que el servidor Node.js esté corriendo.'}`;
      }
    });
  }
}
