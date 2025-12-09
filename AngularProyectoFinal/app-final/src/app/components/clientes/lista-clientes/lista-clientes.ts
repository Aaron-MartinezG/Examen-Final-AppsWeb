import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf y @for
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente-service';
import { HttpErrorResponse } from '@angular/common/http'; // Para manejo de errores

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.scss',
})
export class ListaClientesComponent implements OnInit {
  //Agregamos las variables de estado para nuestros datos
  //Signals
  clientes = signal<Cliente[]>([]);
  cargando = signal<boolean>(true);
  mensajeError: string | null = null;

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.loadClientes();
  }

  private loadClientes(){
    this.cargando.set(true);
    this.mensajeError = null;

    this.clienteService.obtenerClientes().subscribe({
      next:(data) =>{
        this.clientes.set(data);
        this.cargando.set(false);
        console.log('Clientes cargados:', this.clientes)
      },
      error:(err: HttpErrorResponse) =>{
        console.log("Error al cargar los datos.", err);
        this.mensajeError = `Error al conectar con la API: ${err.message}. Asegúrate que el servidor Node.js esté corriendo.`;
        this.clientes.set([]);
        this.cargando.set(false);
      }
    })
  }
}
