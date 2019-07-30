import { Moment } from 'moment';

export interface IServidorAPI {
  id?: string;
  protocolo?: string;
  server?: string;
  port?: string;
  estado?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
}

export const defaultValue: Readonly<IServidorAPI> = {};
