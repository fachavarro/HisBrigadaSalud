import { Moment } from 'moment';

export interface IPaciente {
  id?: string;
  tipoDoc?: string;
  numeroDocumento?: string;
  nombre?: string;
  apellido?: string;
  genero?: string;
  fechaNacimiento?: Moment;
  acudiente?: string;
  ocupacion?: string;
  afiliadoSSS?: boolean;
  cualSSS?: string;
  nacionalidad?: string;
  barrioVive?: string;
  numeroTelefono?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
}

export const defaultValue: Readonly<IPaciente> = {
  afiliadoSSS: false
};
