import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  // En este servicio agregaremos el método para consultar los datos de confirmación
  private apiURL = 'http://localhost:3000' // URL del servidor

  constructor(private http: HttpClient) { }


  registrarServicio(servicioData: Servicio): Observable<any> {
    // La llamada final será a: http://localhost:3000/servicios
    return this.http.post<any>(`${this.apiURL}/servicios`, servicioData);
  }

  // MÉTODO GET: Para obtener todos los servicios
  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiURL}/servicios`);
  }
}
