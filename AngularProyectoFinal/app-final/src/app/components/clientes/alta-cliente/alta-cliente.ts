import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente-service';
import { Cliente } from '../../../models/cliente.model';
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

  // Lista de servicios para el dropdown (simulación de la carga GET)
  servicios: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Contabilidad General' },
    { id: 2, nombre: 'Nómina' },
    { id: 3, nombre: 'Asesoría Fiscal' }
  ];

  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    // Lógica para cargar servicios
  }

  /**
   * Define el estado inicial del modelo y lo resetea.
   */
  resetModel(): ClienteModel {
    const today = new Date().toISOString().substring(0, 10);
    return {
      // PROPIEDAD ALINEADA CON EL MODELO: 'nombre'
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

  /**
   * Maneja el envío del formulario.
   * @param form La referencia al formulario (NgForm) de la plantilla.
   */
  onSubmit(form: NgForm): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (form.invalid) {
      this.mensajeError = 'Por favor, corrige los errores en los campos obligatorios.';
      return;
    }

    const nuevoCliente: Cliente = this.model;

    // Llama al servicio POST para enviar los datos a Node.js
    this.clienteService.registrarCliente(nuevoCliente).subscribe({
      next: (response: any) => { // Tipado explícito 'any'
        console.log('Cliente registrado con éxito:', response);
        // Usamos 'nombre' ya que ahora está alineado con el modelo
        this.mensajeExito = `Cliente ${nuevoCliente.nombre} registrado con ID: ${response.id || 'N/A'}.`;

        // Limpia el formulario y lo resetea al estado inicial
        this.model = this.resetModel();
        form.resetForm(this.model);
      },
      error: (err: HttpErrorResponse) => { // Tipado explícito para error
        console.error('Error al registrar cliente:', err);
        // Muestra un mensaje amigable, tomando el error del backend si existe.
        this.mensajeError = `Error al registrar: ${err.error?.message || 'Verifica que el servidor Node.js esté corriendo.'}`;
      }
    });
  }

}
