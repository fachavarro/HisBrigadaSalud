import { Moment } from 'moment';
import { IAtencion } from 'app/shared/model/atencion.model';

export interface IUsuario {
  id?: string;
  tipoDoc?: string;
  numeroDocumento?: string;
  nombre?: string;
  apellido?: string;
  genero?: string;
  especialidad?: string;
  nombreUsuario?: string;
  contrasena?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  atencion?: IAtencion;
}

export const defaultValue: Readonly<IUsuario> = {};
