export interface Factura{
  id_factura?: number;
  id_cliente: number;
  folio: string;
  fecha_emision: string;
  fecha_pago?: string;
  monto: number;
  estado: string;
}
