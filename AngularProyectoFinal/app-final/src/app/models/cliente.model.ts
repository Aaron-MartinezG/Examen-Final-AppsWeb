export interface Cliente{
  id?: number;
  nombre: string;
  empresa?: string;
  correo: string;
  telefono?: string;
  rfc: string;
  honorarios_mensuales: number;
  fecha_inicio?: string;
  activo: boolean;
  id_servicio: number;
}
