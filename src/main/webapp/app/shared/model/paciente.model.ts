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
  afiliadoSSS?: string;
  cualSSS?: string;
  nacionalidad?: string;
  barrioVive?: string;
  numeroTelefono?: string;
  cargadoSistema?: boolean;
  createdAt?: Moment;
  updatedAt?: Moment;
  atencion?: IAtencion;
}

export const defaultValue: Readonly<IPaciente> = {
  cargadoSistema: false
};
