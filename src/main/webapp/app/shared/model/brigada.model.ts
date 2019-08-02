import { Moment } from 'moment';

export interface IBrigada {
  id?: string;
  descripcion?: string;
  lugar?: string;
  ciudad?: string;
  fechai?: Moment;
  fechaf?: Moment;
  createdAt?: Moment;
  updatedAt?: Moment;
}

export const defaultValue: Readonly<IBrigada> = {};
