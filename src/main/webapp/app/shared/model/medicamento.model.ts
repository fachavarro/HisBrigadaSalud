import { IAtencion } from 'app/shared/model/atencion.model';

export interface IMedicamento {
  id?: string;
  nombreMedicamento?: string;
  atencions?: IAtencion[];
}

export const defaultValue: Readonly<IMedicamento> = {};
