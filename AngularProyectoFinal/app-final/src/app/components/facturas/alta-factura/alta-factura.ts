import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacturaService } from '../../../services/factura-service';
import { ClienteService } from '../../../services/cliente-service';
import { Factura } from '../../../models/factura.model';
import { Cliente } from '../../../models/cliente.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-alta-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alta-factura.html',
  styleUrl: './alta-factura.scss',
})
export class AltaFactura implements OnInit {
  model: Factura = this.resetModel();
  clientes: Cliente[] = []; // Lista para el dropdown

  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        // NOTA: Si el backend no devuelve id, se debe modificar el modelo Cliente
      }
    });
  }

  resetModel(): Factura {
    const today = new Date().toISOString().substring(0, 10);
    return {
      id_cliente: 0,
      folio: '',
      fecha_emision: today,
      fecha_pago: '',
      monto: 0,
      estado: 'Pendiente'
    };
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.mensajeError = 'Formulario inválido. Verifica los campos obligatorios.';
      return;
    }

    this.model.id_cliente = Number(this.model.id_cliente);

    this.facturaService.registrarFactura(this.model).subscribe({
      next: (res) => {
        this.mensajeExito = 'Factura registrada con éxito.';
        this.mensajeError = null;
        this.model = this.resetModel();
        form.resetForm(this.model);
      },
      error: (err: HttpErrorResponse) => {
        this.mensajeError = `Error al registrar: ${err.error?.message || err.message}`;
        this.mensajeExito = null;
      }
    });
  }
}
