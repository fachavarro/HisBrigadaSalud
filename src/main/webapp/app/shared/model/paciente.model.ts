import { Moment } from 'moment';
import { IAtencion } from 'app/shared/model/atencion.model';

export interface IPaciente {
  id?: string;
  tipoDoc?: string;
  numeroDocumento?: string;
  nombre?: string;
  apellido?: string;
  genero?: string;
  fechaNacimiento?: string;
  acudiente?: string;
  ocupacion?: string;
  afiliadoSSS?: boolean;
  cualSSS?: string;
  nacionalidad?: string;
  barrioVive?: string;
  numeroTelefono?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  atencion?: IAtencion;
}

export const defaultValue: Readonly<IPaciente> = {
  afiliadoSSS: false
};
