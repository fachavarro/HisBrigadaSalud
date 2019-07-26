import { Moment } from 'moment';
import { IBrigada } from 'app/shared/model/brigada.model';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IUsuario } from 'app/shared/model/usuario.model';

export interface IAtencion {
  id?: string;
  fecha?: Moment;
  especialidad?: string;
  otraEspecialidad?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  brigada?: IBrigada;
  paciente?: IPaciente;
  usuario?: IUsuario;
}

export const defaultValue: Readonly<IAtencion> = {};
