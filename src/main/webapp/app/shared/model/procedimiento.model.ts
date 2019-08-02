import { IAtencion } from 'app/shared/model/atencion.model';

export interface IProcedimiento {
  id?: string;
  nombreProcedimiento?: string;
  atencions?: IAtencion[];
}

export const defaultValue: Readonly<IProcedimiento> = {};
