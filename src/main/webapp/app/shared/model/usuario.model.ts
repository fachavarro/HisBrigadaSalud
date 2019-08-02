import { Moment } from 'moment';

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
}

export const defaultValue: Readonly<IUsuario> = {};
