import { Moment } from 'moment';
import { IBrigada } from 'app/shared/model/brigada.model';
import { IPaciente } from 'app/shared/model/paciente.model';
import { IUsuario } from 'app/shared/model/usuario.model';
import { IMedicamento } from 'app/shared/model/medicamento.model';
import { IProcedimiento } from 'app/shared/model/procedimiento.model';

export interface IAtencion {
  id?: string;
  fecha?: Moment;
  especialidad?: string;
  otraEspecialidad?: string;
  motivoConsulta?: string;
  enfermedadActual?: string;
  hipertensionArterial?: boolean;
  diabetesMellitus?: boolean;
  cancerAntecedentePatologico?: boolean;
  tuberculosis?: boolean;
  insuficienciaRenal?: boolean;
  vihSida?: boolean;
  otroAntecedentePatologico?: boolean;
  descripcionOtroAntecedentePatologico?: string;
  cancerAntecedenteQuirurgico?: boolean;
  pomeroy?: boolean;
  otroAntecedenteQuirurgico?: boolean;
  descripcionOtroAntecedenteQuirurgico?: string;
  fur?: Moment;
  formulaObstretica?: boolean;
  g?: number;
  p?: number;
  c?: number;
  a?: number;
  v?: number;
  planificacionFamiliar?: string;
  fechaUltimaCitologia?: string;
  ultimoParto?: Moment;
  mamografia?: boolean;
  medicamentosAntecedentes?: string;
  esquemaVacunacion?: string;
  fuma?: boolean;
  alcohol?: boolean;
  sustanciasPsicoactivas?: boolean;
  revisionPorSistemas?: string;
  peso?: number;
  talla?: number;
  imc?: number;
  fc?: number;
  fr?: number;
  temperatura?: number;
  saturacion?: number;
  hemoglobina?: number;
  glucometria?: number;
  circunferenciaBrazo?: number;
  circunferenciaAbdominal?: number;
  hallazgosExamenFisico?: string;
  valoracionNutricional?: string;
  diagnosticoPrincipal?: string;
  diagnosticoSecundario?: string;
  observacionesTratamiento?: string;
  recomendaciones?: string;
  destino?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  brigada?: IBrigada;
  paciente?: IPaciente;
  usuario?: IUsuario;
  medicamentos?: IMedicamento[];
  procedimientos?: IProcedimiento[];
}

export const defaultValue: Readonly<IAtencion> = {
  hipertensionArterial: false,
  diabetesMellitus: false,
  cancerAntecedentePatologico: false,
  tuberculosis: false,
  insuficienciaRenal: false,
  vihSida: false,
  otroAntecedentePatologico: false,
  cancerAntecedenteQuirurgico: false,
  pomeroy: false,
  otroAntecedenteQuirurgico: false,
  formulaObstretica: false,
  mamografia: false,
  fuma: false,
  alcohol: false,
  sustanciasPsicoactivas: false
};
