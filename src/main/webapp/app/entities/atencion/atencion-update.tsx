import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBrigada } from 'app/shared/model/brigada.model';
import { getEntities as getBrigadas } from 'app/entities/brigada/brigada.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import { IMedicamento } from 'app/shared/model/medicamento.model';
import { getEntities as getMedicamentos } from 'app/entities/medicamento/medicamento.reducer';
import { IProcedimiento } from 'app/shared/model/procedimiento.model';
import { getEntities as getProcedimientos } from 'app/entities/procedimiento/procedimiento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './atencion.reducer';
import { IAtencion } from 'app/shared/model/atencion.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtencionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtencionUpdateState {
  isNew: boolean;
  idsmedicamentos: any[];
  idsprocedimientos: any[];
  brigadaId: string;
  pacienteId: string;
  usuarioId: string;
}

export class AtencionUpdate extends React.Component<IAtencionUpdateProps, IAtencionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmedicamentos: [],
      idsprocedimientos: [],
      brigadaId: '0',
      pacienteId: '0',
      usuarioId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getBrigadas();
    this.props.getPacientes();
    this.props.getUsuarios();
    this.props.getMedicamentos();
    this.props.getProcedimientos();
  }

  saveEntity = (event, errors, values) => {
    values.fecha = convertDateTimeToServer(values.fecha);
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const { atencionEntity } = this.props;
      const entity = {
        ...atencionEntity,
        ...values,
        medicamentos: mapIdList(values.medicamentos),
        procedimientos: mapIdList(values.procedimientos)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/atencion');
  };

  render() {
    const { atencionEntity, brigadas, pacientes, usuarios, medicamentos, procedimientos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.atencion.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.atencion.home.createOrEditLabel">Create or edit a Atencion</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : atencionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="atencion-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="atencion-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="fechaLabel" for="atencion-fecha">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fecha">Fecha</Translate>
                  </Label>
                  <AvInput
                    id="atencion-fecha"
                    type="datetime-local"
                    className="form-control"
                    name="fecha"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.atencionEntity.fecha)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="especialidadLabel" for="atencion-especialidad">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.especialidad">Especialidad</Translate>
                  </Label>
                  <AvField
                    id="atencion-especialidad"
                    type="text"
                    name="especialidad"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="otraEspecialidadLabel" for="atencion-otraEspecialidad">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.otraEspecialidad">Otra Especialidad</Translate>
                  </Label>
                  <AvField
                    id="atencion-otraEspecialidad"
                    type="text"
                    name="otraEspecialidad"
                    validate={{
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="motivoConsultaLabel" for="atencion-motivoConsulta">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.motivoConsulta">Motivo Consulta</Translate>
                  </Label>
                  <AvField
                    id="atencion-motivoConsulta"
                    type="text"
                    name="motivoConsulta"
                    validate={{
                      maxLength: { value: 1000, errorMessage: translate('entity.validation.maxlength', { max: 1000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="enfermedadActualLabel" for="atencion-enfermedadActual">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.enfermedadActual">Enfermedad Actual</Translate>
                  </Label>
                  <AvField
                    id="atencion-enfermedadActual"
                    type="text"
                    name="enfermedadActual"
                    validate={{
                      maxLength: { value: 4000, errorMessage: translate('entity.validation.maxlength', { max: 4000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="hipertensionArterialLabel" check>
                    <AvInput id="atencion-hipertensionArterial" type="checkbox" className="form-control" name="hipertensionArterial" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.hipertensionArterial">Hipertension Arterial</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="diabetesMellitusLabel" check>
                    <AvInput id="atencion-diabetesMellitus" type="checkbox" className="form-control" name="diabetesMellitus" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.diabetesMellitus">Diabetes Mellitus</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="cancerAntecedentePatologicoLabel" check>
                    <AvInput
                      id="atencion-cancerAntecedentePatologico"
                      type="checkbox"
                      className="form-control"
                      name="cancerAntecedentePatologico"
                    />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.cancerAntecedentePatologico">
                      Cancer Antecedente Patologico
                    </Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="tuberculosisLabel" check>
                    <AvInput id="atencion-tuberculosis" type="checkbox" className="form-control" name="tuberculosis" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.tuberculosis">Tuberculosis</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="insuficienciaRenalLabel" check>
                    <AvInput id="atencion-insuficienciaRenal" type="checkbox" className="form-control" name="insuficienciaRenal" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.insuficienciaRenal">Insuficiencia Renal</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="vihSidaLabel" check>
                    <AvInput id="atencion-vihSida" type="checkbox" className="form-control" name="vihSida" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.vihSida">Vih Sida</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="otroAntecedentePatologicoLabel" check>
                    <AvInput
                      id="atencion-otroAntecedentePatologico"
                      type="checkbox"
                      className="form-control"
                      name="otroAntecedentePatologico"
                    />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.otroAntecedentePatologico">Otro Antecedente Patologico</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="descripcionOtroAntecedentePatologicoLabel" for="atencion-descripcionOtroAntecedentePatologico">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.descripcionOtroAntecedentePatologico">
                      Descripcion Otro Antecedente Patologico
                    </Translate>
                  </Label>
                  <AvField
                    id="atencion-descripcionOtroAntecedentePatologico"
                    type="text"
                    name="descripcionOtroAntecedentePatologico"
                    validate={{
                      maxLength: { value: 500, errorMessage: translate('entity.validation.maxlength', { max: 500 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cancerAntecedenteQuirurgicoLabel" check>
                    <AvInput
                      id="atencion-cancerAntecedenteQuirurgico"
                      type="checkbox"
                      className="form-control"
                      name="cancerAntecedenteQuirurgico"
                    />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.cancerAntecedenteQuirurgico">
                      Cancer Antecedente Quirurgico
                    </Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="pomeroyLabel" check>
                    <AvInput id="atencion-pomeroy" type="checkbox" className="form-control" name="pomeroy" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.pomeroy">Pomeroy</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="otroAntecedenteQuirurgicoLabel" check>
                    <AvInput
                      id="atencion-otroAntecedenteQuirurgico"
                      type="checkbox"
                      className="form-control"
                      name="otroAntecedenteQuirurgico"
                    />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.otroAntecedenteQuirurgico">Otro Antecedente Quirurgico</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="descripcionOtroAntecedenteQuirurgicoLabel" for="atencion-descripcionOtroAntecedenteQuirurgico">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.descripcionOtroAntecedenteQuirurgico">
                      Descripcion Otro Antecedente Quirurgico
                    </Translate>
                  </Label>
                  <AvField
                    id="atencion-descripcionOtroAntecedenteQuirurgico"
                    type="text"
                    name="descripcionOtroAntecedenteQuirurgico"
                    validate={{
                      maxLength: { value: 500, errorMessage: translate('entity.validation.maxlength', { max: 500 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="furLabel" for="atencion-fur">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fur">Fur</Translate>
                  </Label>
                  <AvField id="atencion-fur" type="date" className="form-control" name="fur" />
                </AvGroup>
                <AvGroup>
                  <Label id="formulaObstreticaLabel" check>
                    <AvInput id="atencion-formulaObstretica" type="checkbox" className="form-control" name="formulaObstretica" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.formulaObstretica">Formula Obstretica</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="gLabel" for="atencion-g">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.g">G</Translate>
                  </Label>
                  <AvField id="atencion-g" type="string" className="form-control" name="g" />
                </AvGroup>
                <AvGroup>
                  <Label id="pLabel" for="atencion-p">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.p">P</Translate>
                  </Label>
                  <AvField id="atencion-p" type="string" className="form-control" name="p" />
                </AvGroup>
                <AvGroup>
                  <Label id="cLabel" for="atencion-c">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.c">C</Translate>
                  </Label>
                  <AvField id="atencion-c" type="string" className="form-control" name="c" />
                </AvGroup>
                <AvGroup>
                  <Label id="aLabel" for="atencion-a">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.a">A</Translate>
                  </Label>
                  <AvField id="atencion-a" type="string" className="form-control" name="a" />
                </AvGroup>
                <AvGroup>
                  <Label id="vLabel" for="atencion-v">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.v">V</Translate>
                  </Label>
                  <AvField id="atencion-v" type="string" className="form-control" name="v" />
                </AvGroup>
                <AvGroup>
                  <Label id="planificacionFamiliarLabel" for="atencion-planificacionFamiliar">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.planificacionFamiliar">Planificacion Familiar</Translate>
                  </Label>
                  <AvField
                    id="atencion-planificacionFamiliar"
                    type="text"
                    name="planificacionFamiliar"
                    validate={{
                      maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaUltimaCitologiaLabel" for="atencion-fechaUltimaCitologia">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fechaUltimaCitologia">Fecha Ultima Citologia</Translate>
                  </Label>
                  <AvField id="atencion-fechaUltimaCitologia" type="text" name="fechaUltimaCitologia" />
                </AvGroup>
                <AvGroup>
                  <Label id="ultimoPartoLabel" for="atencion-ultimoParto">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.ultimoParto">Ultimo Parto</Translate>
                  </Label>
                  <AvField id="atencion-ultimoParto" type="date" className="form-control" name="ultimoParto" />
                </AvGroup>
                <AvGroup>
                  <Label id="mamografiaLabel" check>
                    <AvInput id="atencion-mamografia" type="checkbox" className="form-control" name="mamografia" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.mamografia">Mamografia</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="medicamentosAntecedentesLabel" for="atencion-medicamentosAntecedentes">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.medicamentosAntecedentes">Medicamentos Antecedentes</Translate>
                  </Label>
                  <AvField
                    id="atencion-medicamentosAntecedentes"
                    type="text"
                    name="medicamentosAntecedentes"
                    validate={{
                      maxLength: { value: 1000, errorMessage: translate('entity.validation.maxlength', { max: 1000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="esquemaVacunacionLabel" for="atencion-esquemaVacunacion">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.esquemaVacunacion">Esquema Vacunacion</Translate>
                  </Label>
                  <AvField id="atencion-esquemaVacunacion" type="text" name="esquemaVacunacion" />
                </AvGroup>
                <AvGroup>
                  <Label id="fumaLabel" check>
                    <AvInput id="atencion-fuma" type="checkbox" className="form-control" name="fuma" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fuma">Fuma</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="alcoholLabel" check>
                    <AvInput id="atencion-alcohol" type="checkbox" className="form-control" name="alcohol" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.alcohol">Alcohol</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="sustanciasPsicoactivasLabel" check>
                    <AvInput id="atencion-sustanciasPsicoactivas" type="checkbox" className="form-control" name="sustanciasPsicoactivas" />
                    <Translate contentKey="hisBrigadaSaludApp.atencion.sustanciasPsicoactivas">Sustancias Psicoactivas</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="revisionPorSistemasLabel" for="atencion-revisionPorSistemas">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.revisionPorSistemas">Revision Por Sistemas</Translate>
                  </Label>
                  <AvField
                    id="atencion-revisionPorSistemas"
                    type="text"
                    name="revisionPorSistemas"
                    validate={{
                      maxLength: { value: 1000, errorMessage: translate('entity.validation.maxlength', { max: 1000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pesoLabel" for="atencion-peso">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.peso">Peso</Translate>
                  </Label>
                  <AvField id="atencion-peso" type="text" name="peso" />
                </AvGroup>
                <AvGroup>
                  <Label id="tallaLabel" for="atencion-talla">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.talla">Talla</Translate>
                  </Label>
                  <AvField id="atencion-talla" type="text" name="talla" />
                </AvGroup>
                <AvGroup>
                  <Label id="imcLabel" for="atencion-imc">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.imc">Imc</Translate>
                  </Label>
                  <AvField id="atencion-imc" type="text" name="imc" />
                </AvGroup>
                <AvGroup>
                  <Label id="fcLabel" for="atencion-fc">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fc">Fc</Translate>
                  </Label>
                  <AvField id="atencion-fc" type="string" className="form-control" name="fc" />
                </AvGroup>
                <AvGroup>
                  <Label id="frLabel" for="atencion-fr">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fr">Fr</Translate>
                  </Label>
                  <AvField id="atencion-fr" type="string" className="form-control" name="fr" />
                </AvGroup>
                <AvGroup>
                  <Label id="temperaturaLabel" for="atencion-temperatura">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.temperatura">Temperatura</Translate>
                  </Label>
                  <AvField id="atencion-temperatura" type="text" name="temperatura" />
                </AvGroup>
                <AvGroup>
                  <Label id="saturacionLabel" for="atencion-saturacion">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.saturacion">Saturacion</Translate>
                  </Label>
                  <AvField id="atencion-saturacion" type="string" className="form-control" name="saturacion" />
                </AvGroup>
                <AvGroup>
                  <Label id="hemoglobinaLabel" for="atencion-hemoglobina">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.hemoglobina">Hemoglobina</Translate>
                  </Label>
                  <AvField id="atencion-hemoglobina" type="text" name="hemoglobina" />
                </AvGroup>
                <AvGroup>
                  <Label id="glucometriaLabel" for="atencion-glucometria">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.glucometria">Glucometria</Translate>
                  </Label>
                  <AvField id="atencion-glucometria" type="string" className="form-control" name="glucometria" />
                </AvGroup>
                <AvGroup>
                  <Label id="circunferenciaBrazoLabel" for="atencion-circunferenciaBrazo">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.circunferenciaBrazo">Circunferencia Brazo</Translate>
                  </Label>
                  <AvField id="atencion-circunferenciaBrazo" type="text" name="circunferenciaBrazo" />
                </AvGroup>
                <AvGroup>
                  <Label id="circunferenciaAbdominalLabel" for="atencion-circunferenciaAbdominal">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.circunferenciaAbdominal">Circunferencia Abdominal</Translate>
                  </Label>
                  <AvField id="atencion-circunferenciaAbdominal" type="text" name="circunferenciaAbdominal" />
                </AvGroup>
                <AvGroup>
                  <Label id="hallazgosExamenFisicoLabel" for="atencion-hallazgosExamenFisico">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.hallazgosExamenFisico">Hallazgos Examen Fisico</Translate>
                  </Label>
                  <AvField
                    id="atencion-hallazgosExamenFisico"
                    type="text"
                    name="hallazgosExamenFisico"
                    validate={{
                      maxLength: { value: 4000, errorMessage: translate('entity.validation.maxlength', { max: 4000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="valoracionNutricionalLabel" for="atencion-valoracionNutricional">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.valoracionNutricional">Valoracion Nutricional</Translate>
                  </Label>
                  <AvField
                    id="atencion-valoracionNutricional"
                    type="text"
                    name="valoracionNutricional"
                    validate={{
                      maxLength: { value: 4000, errorMessage: translate('entity.validation.maxlength', { max: 4000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="diagnosticoPrincipalLabel" for="atencion-diagnosticoPrincipal">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.diagnosticoPrincipal">Diagnostico Principal</Translate>
                  </Label>
                  <AvField id="atencion-diagnosticoPrincipal" type="text" name="diagnosticoPrincipal" />
                </AvGroup>
                <AvGroup>
                  <Label id="diagnosticoSecundarioLabel" for="atencion-diagnosticoSecundario">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.diagnosticoSecundario">Diagnostico Secundario</Translate>
                  </Label>
                  <AvField id="atencion-diagnosticoSecundario" type="text" name="diagnosticoSecundario" />
                </AvGroup>
                <AvGroup>
                  <Label id="observacionesTratamientoLabel" for="atencion-observacionesTratamiento">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.observacionesTratamiento">Observaciones Tratamiento</Translate>
                  </Label>
                  <AvField
                    id="atencion-observacionesTratamiento"
                    type="text"
                    name="observacionesTratamiento"
                    validate={{
                      maxLength: { value: 1000, errorMessage: translate('entity.validation.maxlength', { max: 1000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="recomendacionesLabel" for="atencion-recomendaciones">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.recomendaciones">Recomendaciones</Translate>
                  </Label>
                  <AvField
                    id="atencion-recomendaciones"
                    type="text"
                    name="recomendaciones"
                    validate={{
                      maxLength: { value: 2000, errorMessage: translate('entity.validation.maxlength', { max: 2000 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="destinoLabel" for="atencion-destino">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.destino">Destino</Translate>
                  </Label>
                  <AvField id="atencion-destino" type="text" name="destino" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="atencion-createdAt">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="atencion-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.atencionEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="atencion-updatedAt">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.updatedAt">Updated At</Translate>
                  </Label>
                  <AvInput
                    id="atencion-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.atencionEntity.updatedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-brigada">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.brigada">Brigada</Translate>
                  </Label>
                  <AvInput id="atencion-brigada" type="select" className="form-control" name="brigada.id">
                    <option value="" key="0" />
                    {brigadas
                      ? brigadas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.descripcion}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-paciente">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.paciente">Paciente</Translate>
                  </Label>
                  <AvInput id="atencion-paciente" type="select" className="form-control" name="paciente.id">
                    <option value="" key="0" />
                    {pacientes
                      ? pacientes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nombre}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-usuario">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.usuario">Usuario</Translate>
                  </Label>
                  <AvInput id="atencion-usuario" type="select" className="form-control" name="usuario.id">
                    <option value="" key="0" />
                    {usuarios
                      ? usuarios.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nombre}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-medicamentos">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.medicamentos">Medicamentos</Translate>
                  </Label>
                  <AvInput
                    id="atencion-medicamentos"
                    type="select"
                    multiple
                    className="form-control"
                    name="medicamentos"
                    value={atencionEntity.medicamentos && atencionEntity.medicamentos.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {medicamentos
                      ? medicamentos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nombreMedicamento}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-procedimientos">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.procedimientos">Procedimientos</Translate>
                  </Label>
                  <AvInput
                    id="atencion-procedimientos"
                    type="select"
                    multiple
                    className="form-control"
                    name="procedimientos"
                    value={atencionEntity.procedimientos && atencionEntity.procedimientos.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {procedimientos
                      ? procedimientos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nombreProcedimiento}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/atencion" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  brigadas: storeState.brigada.entities,
  pacientes: storeState.paciente.entities,
  usuarios: storeState.usuario.entities,
  medicamentos: storeState.medicamento.entities,
  procedimientos: storeState.procedimiento.entities,
  atencionEntity: storeState.atencion.entity,
  loading: storeState.atencion.loading,
  updating: storeState.atencion.updating,
  updateSuccess: storeState.atencion.updateSuccess
});

const mapDispatchToProps = {
  getBrigadas,
  getPacientes,
  getUsuarios,
  getMedicamentos,
  getProcedimientos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AtencionUpdate);
