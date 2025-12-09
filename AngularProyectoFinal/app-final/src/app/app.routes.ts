import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes';
import { AltaClienteComponent } from './components/clientes/alta-cliente/alta-cliente';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path:'inicio', component: InicioComponent },
  { path:'listaClientes', component: ListaClientesComponent},
  { path: 'altaClientes', component: AltaClienteComponent},

  // Añadimos rutas de Facturas y Servicios para que el menú funcione
  { path: 'facturas/registro', component: AltaClienteComponent }, // Temporal
  { path: 'servicios/registro', component: AltaClienteComponent }, // Temporal
  { path: '**', redirectTo: 'inicio' }
];
