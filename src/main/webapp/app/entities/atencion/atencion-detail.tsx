import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './atencion.reducer';
import { IAtencion } from 'app/shared/model/atencion.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtencionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtencionDetail extends React.Component<IAtencionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atencionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hisBrigadaSaludApp.atencion.detail.title">Atencion</Translate> [<b>{atencionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="fecha">
                <Translate contentKey="hisBrigadaSaludApp.atencion.fecha">Fecha</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={atencionEntity.fecha} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="especialidad">
                <Translate contentKey="hisBrigadaSaludApp.atencion.especialidad">Especialidad</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.especialidad}</dd>
            <dt>
              <span id="otraEspecialidad">
                <Translate contentKey="hisBrigadaSaludApp.atencion.otraEspecialidad">Otra Especialidad</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.otraEspecialidad}</dd>
            <dt>
              <span id="motivoConsulta">
                <Translate contentKey="hisBrigadaSaludApp.atencion.motivoConsulta">Motivo Consulta</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.motivoConsulta}</dd>
            <dt>
              <span id="enfermedadActual">
                <Translate contentKey="hisBrigadaSaludApp.atencion.enfermedadActual">Enfermedad Actual</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.enfermedadActual}</dd>
            <dt>
              <span id="hipertensionArterial">
                <Translate contentKey="hisBrigadaSaludApp.atencion.hipertensionArterial">Hipertension Arterial</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.hipertensionArterial ? 'true' : 'false'}</dd>
            <dt>
              <span id="diabetesMellitus">
                <Translate contentKey="hisBrigadaSaludApp.atencion.diabetesMellitus">Diabetes Mellitus</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.diabetesMellitus ? 'true' : 'false'}</dd>
            <dt>
              <span id="cancerAntecedentePatologico">
                <Translate contentKey="hisBrigadaSaludApp.atencion.cancerAntecedentePatologico">Cancer Antecedente Patologico</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.cancerAntecedentePatologico ? 'true' : 'false'}</dd>
            <dt>
              <span id="tuberculosis">
                <Translate contentKey="hisBrigadaSaludApp.atencion.tuberculosis">Tuberculosis</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.tuberculosis ? 'true' : 'false'}</dd>
            <dt>
              <span id="insuficienciaRenal">
                <Translate contentKey="hisBrigadaSaludApp.atencion.insuficienciaRenal">Insuficiencia Renal</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.insuficienciaRenal ? 'true' : 'false'}</dd>
            <dt>
              <span id="vihSida">
                <Translate contentKey="hisBrigadaSaludApp.atencion.vihSida">Vih Sida</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.vihSida ? 'true' : 'false'}</dd>
            <dt>
              <span id="otroAntecedentePatologico">
                <Translate contentKey="hisBrigadaSaludApp.atencion.otroAntecedentePatologico">Otro Antecedente Patologico</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.otroAntecedentePatologico ? 'true' : 'false'}</dd>
            <dt>
              <span id="descripcionOtroAntecedentePatologico">
                <Translate contentKey="hisBrigadaSaludApp.atencion.descripcionOtroAntecedentePatologico">
                  Descripcion Otro Antecedente Patologico
                </Translate>
              </span>
            </dt>
            <dd>{atencionEntity.descripcionOtroAntecedentePatologico}</dd>
            <dt>
              <span id="cancerAntecedenteQuirurgico">
                <Translate contentKey="hisBrigadaSaludApp.atencion.cancerAntecedenteQuirurgico">Cancer Antecedente Quirurgico</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.cancerAntecedenteQuirurgico ? 'true' : 'false'}</dd>
            <dt>
              <span id="pomeroy">
                <Translate contentKey="hisBrigadaSaludApp.atencion.pomeroy">Pomeroy</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.pomeroy ? 'true' : 'false'}</dd>
            <dt>
              <span id="otroAntecedenteQuirurgico">
                <Translate contentKey="hisBrigadaSaludApp.atencion.otroAntecedenteQuirurgico">Otro Antecedente Quirurgico</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.otroAntecedenteQuirurgico ? 'true' : 'false'}</dd>
            <dt>
              <span id="descripcionOtroAntecedenteQuirurgico">
                <Translate contentKey="hisBrigadaSaludApp.atencion.descripcionOtroAntecedenteQuirurgico">
                  Descripcion Otro Antecedente Quirurgico
                </Translate>
              </span>
            </dt>
            <dd>{atencionEntity.descripcionOtroAntecedenteQuirurgico}</dd>
            <dt>
              <span id="fur">
                <Translate contentKey="hisBrigadaSaludApp.atencion.fur">Fur</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={atencionEntity.fur} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="formulaObstretica">
                <Translate contentKey="hisBrigadaSaludApp.atencion.formulaObstretica">Formula Obstretica</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.formulaObstretica ? 'true' : 'false'}</dd>
            <dt>
              <span id="g">
                <Translate contentKey="hisBrigadaSaludApp.atencion.g">G</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.g}</dd>
            <dt>
              <span id="p">
                <Translate contentKey="hisBrigadaSaludApp.atencion.p">P</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.p}</dd>
            <dt>
              <span id="c">
                <Translate contentKey="hisBrigadaSaludApp.atencion.c">C</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.c}</dd>
            <dt>
              <span id="a">
                <Translate contentKey="hisBrigadaSaludApp.atencion.a">A</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.a}</dd>
            <dt>
              <span id="v">
                <Translate contentKey="hisBrigadaSaludApp.atencion.v">V</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.v}</dd>
            <dt>
              <span id="planificacionFamiliar">
                <Translate contentKey="hisBrigadaSaludApp.atencion.planificacionFamiliar">Planificacion Familiar</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.planificacionFamiliar}</dd>
            <dt>
              <span id="fechaUltimaCitologia">
                <Translate contentKey="hisBrigadaSaludApp.atencion.fechaUltimaCitologia">Fecha Ultima Citologia</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.fechaUltimaCitologia}</dd>
            <dt>
              <span id="ultimoParto">
                <Translate contentKey="hisBrigadaSaludApp.atencion.ultimoParto">Ultimo Parto</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={atencionEntity.ultimoParto} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="mamografia">
                <Translate contentKey="hisBrigadaSaludApp.atencion.mamografia">Mamografia</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.mamografia ? 'true' : 'false'}</dd>
            <dt>
              <span id="medicamentosAntecedentes">
                <Translate contentKey="hisBrigadaSaludApp.atencion.medicamentosAntecedentes">Medicamentos Antecedentes</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.medicamentosAntecedentes}</dd>
            <dt>
              <span id="esquemaVacunacion">
                <Translate contentKey="hisBrigadaSaludApp.atencion.esquemaVacunacion">Esquema Vacunacion</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.esquemaVacunacion}</dd>
            <dt>
              <span id="fuma">
                <Translate contentKey="hisBrigadaSaludApp.atencion.fuma">Fuma</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.fuma ? 'true' : 'false'}</dd>
            <dt>
              <span id="alcohol">
                <Translate contentKey="hisBrigadaSaludApp.atencion.alcohol">Alcohol</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.alcohol ? 'true' : 'false'}</dd>
            <dt>
              <span id="sustanciasPsicoactivas">
                <Translate contentKey="hisBrigadaSaludApp.atencion.sustanciasPsicoactivas">Sustancias Psicoactivas</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.sustanciasPsicoactivas ? 'true' : 'false'}</dd>
            <dt>
              <span id="revisionPorSistemas">
                <Translate contentKey="hisBrigadaSaludApp.atencion.revisionPorSistemas">Revision Por Sistemas</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.revisionPorSistemas}</dd>
            <dt>
              <span id="peso">
                <Translate contentKey="hisBrigadaSaludApp.atencion.peso">Peso</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.peso}</dd>
            <dt>
              <span id="talla">
                <Translate contentKey="hisBrigadaSaludApp.atencion.talla">Talla</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.talla}</dd>
            <dt>
              <span id="imc">
                <Translate contentKey="hisBrigadaSaludApp.atencion.imc">Imc</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.imc}</dd>
            <dt>
              <span id="fc">
                <Translate contentKey="hisBrigadaSaludApp.atencion.fc">Fc</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.fc}</dd>
            <dt>
              <span id="fr">
                <Translate contentKey="hisBrigadaSaludApp.atencion.fr">Fr</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.fr}</dd>
            <dt>
              <span id="temperatura">
                <Translate contentKey="hisBrigadaSaludApp.atencion.temperatura">Temperatura</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.temperatura}</dd>
            <dt>
              <span id="saturacion">
                <Translate contentKey="hisBrigadaSaludApp.atencion.saturacion">Saturacion</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.saturacion}</dd>
            <dt>
              <span id="hemoglobina">
                <Translate contentKey="hisBrigadaSaludApp.atencion.hemoglobina">Hemoglobina</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.hemoglobina}</dd>
            <dt>
              <span id="glucometria">
                <Translate contentKey="hisBrigadaSaludApp.atencion.glucometria">Glucometria</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.glucometria}</dd>
            <dt>
              <span id="circunferenciaBrazo">
                <Translate contentKey="hisBrigadaSaludApp.atencion.circunferenciaBrazo">Circunferencia Brazo</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.circunferenciaBrazo}</dd>
            <dt>
              <span id="circunferenciaAbdominal">
                <Translate contentKey="hisBrigadaSaludApp.atencion.circunferenciaAbdominal">Circunferencia Abdominal</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.circunferenciaAbdominal}</dd>
            <dt>
              <span id="hallazgosExamenFisico">
                <Translate contentKey="hisBrigadaSaludApp.atencion.hallazgosExamenFisico">Hallazgos Examen Fisico</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.hallazgosExamenFisico}</dd>
            <dt>
              <span id="valoracionNutricional">
                <Translate contentKey="hisBrigadaSaludApp.atencion.valoracionNutricional">Valoracion Nutricional</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.valoracionNutricional}</dd>
            <dt>
              <span id="diagnosticoPrincipal">
                <Translate contentKey="hisBrigadaSaludApp.atencion.diagnosticoPrincipal">Diagnostico Principal</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.diagnosticoPrincipal}</dd>
            <dt>
              <span id="diagnosticoSecundario">
                <Translate contentKey="hisBrigadaSaludApp.atencion.diagnosticoSecundario">Diagnostico Secundario</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.diagnosticoSecundario}</dd>
            <dt>
              <span id="observacionesTratamiento">
                <Translate contentKey="hisBrigadaSaludApp.atencion.observacionesTratamiento">Observaciones Tratamiento</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.observacionesTratamiento}</dd>
            <dt>
              <span id="recomendaciones">
                <Translate contentKey="hisBrigadaSaludApp.atencion.recomendaciones">Recomendaciones</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.recomendaciones}</dd>
            <dt>
              <span id="destino">
                <Translate contentKey="hisBrigadaSaludApp.atencion.destino">Destino</Translate>
              </span>
            </dt>
            <dd>{atencionEntity.destino}</dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="hisBrigadaSaludApp.atencion.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={atencionEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">
                <Translate contentKey="hisBrigadaSaludApp.atencion.updatedAt">Updated At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={atencionEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="hisBrigadaSaludApp.atencion.brigada">Brigada</Translate>
            </dt>
            <dd>{atencionEntity.brigada ? atencionEntity.brigada.descripcion : ''}</dd>
            <dt>
              <Translate contentKey="hisBrigadaSaludApp.atencion.paciente">Paciente</Translate>
            </dt>
            <dd>{atencionEntity.paciente ? atencionEntity.paciente.id : ''}</dd>
            <dt>
              <Translate contentKey="hisBrigadaSaludApp.atencion.usuario">Usuario</Translate>
            </dt>
            <dd>{atencionEntity.usuario ? atencionEntity.usuario.id : ''}</dd>
            <dt>
              <Translate contentKey="hisBrigadaSaludApp.atencion.medicamentos">Medicamentos</Translate>
            </dt>
            <dd>
              {atencionEntity.medicamentos
                ? atencionEntity.medicamentos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.nombreMedicamento}</a>
                      {i === atencionEntity.medicamentos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="hisBrigadaSaludApp.atencion.procedimientos">Procedimientos</Translate>
            </dt>
            <dd>
              {atencionEntity.procedimientos
                ? atencionEntity.procedimientos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.nombreProcedimiento}</a>
                      {i === atencionEntity.procedimientos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/atencion" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/atencion/${atencionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ atencion }: IRootState) => ({
  atencionEntity: atencion.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AtencionDetail);
