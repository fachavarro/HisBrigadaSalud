import { Moment } from 'moment';
import { IAtencion } from 'app/shared/model/atencion.model';

export interface IBrigada {
  id?: string;
  descripcion?: string;
  lugar?: string;
  ciudad?: string;
  fechai?: Moment;
  fechaf?: Moment;
  cargadoSistema?: boolean;
  createdAt?: Moment;
  updatedAt?: Moment;
  atencion?: IAtencion;
}

export const defaultValue: Readonly<IBrigada> = {
  cargadoSistema: false
};
