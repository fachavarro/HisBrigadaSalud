import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './atencion.reducer';
import { IAtencion } from 'app/shared/model/atencion.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtencionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Atencion extends React.Component<IAtencionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { atencionList, match } = this.props;
    return (
      <div>
        <h2 id="atencion-heading">
          <Translate contentKey="hisBrigadaSaludApp.atencion.home.title">Atencions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hisBrigadaSaludApp.atencion.home.createLabel">Create new Atencion</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {atencionList && atencionList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fecha">Fecha</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.especialidad">Especialidad</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.otraEspecialidad">Otra Especialidad</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.motivoConsulta">Motivo Consulta</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.enfermedadActual">Enfermedad Actual</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.hipertensionArterial">Hipertension Arterial</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.diabetesMellitus">Diabetes Mellitus</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.cancerAntecedentePatologico">
                      Cancer Antecedente Patologico
                    </Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.tuberculosis">Tuberculosis</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.insuficienciaRenal">Insuficiencia Renal</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.vihSida">Vih Sida</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.otroAntecedentePatologico">Otro Antecedente Patologico</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.descripcionOtroAntecedentePatologico">
                      Descripcion Otro Antecedente Patologico
                    </Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.cancerAntecedenteQuirurgico">
                      Cancer Antecedente Quirurgico
                    </Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.pomeroy">Pomeroy</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.otroAntecedenteQuirurgico">Otro Antecedente Quirurgico</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.descripcionOtroAntecedenteQuirurgico">
                      Descripcion Otro Antecedente Quirurgico
                    </Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fur">Fur</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.formulaObstretica">Formula Obstretica</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.g">G</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.p">P</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.c">C</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.a">A</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.v">V</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.planificacionFamiliar">Planificacion Familiar</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fechaUltimaCitologia">Fecha Ultima Citologia</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.ultimoParto">Ultimo Parto</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.mamografia">Mamografia</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.medicamentosAntecedentes">Medicamentos Antecedentes</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.esquemaVacunacion">Esquema Vacunacion</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fuma">Fuma</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.alcohol">Alcohol</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.sustanciasPsicoactivas">Sustancias Psicoactivas</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.revisionPorSistemas">Revision Por Sistemas</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.peso">Peso</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.talla">Talla</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.imc">Imc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fc">Fc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fr">Fr</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.temperatura">Temperatura</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.saturacion">Saturacion</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.hemoglobina">Hemoglobina</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.glucometria">Glucometria</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.circunferenciaBrazo">Circunferencia Brazo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.circunferenciaAbdominal">Circunferencia Abdominal</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.hallazgosExamenFisico">Hallazgos Examen Fisico</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.valoracionNutricional">Valoracion Nutricional</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.diagnosticoPrincipal">Diagnostico Principal</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.diagnosticoSecundario">Diagnostico Secundario</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.medicamentos">Medicamentos</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.procedimientos">Procedimientos</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.observacionesTratamiento">Observaciones Tratamiento</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.recomendaciones">Recomendaciones</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.destino">Destino</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.createdAt">Created At</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.updatedAt">Updated At</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.brigada">Brigada</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.paciente">Paciente</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.atencion.usuario">Usuario</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {atencionList.map((atencion, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${atencion.id}`} color="link" size="sm">
                        {atencion.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={atencion.fecha} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{atencion.especialidad}</td>
                    <td>{atencion.otraEspecialidad}</td>
                    <td>{atencion.motivoConsulta}</td>
                    <td>{atencion.enfermedadActual}</td>
                    <td>{atencion.hipertensionArterial ? 'true' : 'false'}</td>
                    <td>{atencion.diabetesMellitus ? 'true' : 'false'}</td>
                    <td>{atencion.cancerAntecedentePatologico ? 'true' : 'false'}</td>
                    <td>{atencion.tuberculosis ? 'true' : 'false'}</td>
                    <td>{atencion.insuficienciaRenal ? 'true' : 'false'}</td>
                    <td>{atencion.vihSida ? 'true' : 'false'}</td>
                    <td>{atencion.otroAntecedentePatologico ? 'true' : 'false'}</td>
                    <td>{atencion.descripcionOtroAntecedentePatologico}</td>
                    <td>{atencion.cancerAntecedenteQuirurgico ? 'true' : 'false'}</td>
                    <td>{atencion.pomeroy ? 'true' : 'false'}</td>
                    <td>{atencion.otroAntecedenteQuirurgico ? 'true' : 'false'}</td>
                    <td>{atencion.descripcionOtroAntecedenteQuirurgico}</td>
                    <td>
                      <TextFormat type="date" value={atencion.fur} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{atencion.formulaObstretica ? 'true' : 'false'}</td>
                    <td>{atencion.g}</td>
                    <td>{atencion.p}</td>
                    <td>{atencion.c}</td>
                    <td>{atencion.a}</td>
                    <td>{atencion.v}</td>
                    <td>{atencion.planificacionFamiliar}</td>
                    <td>{atencion.fechaUltimaCitologia}</td>
                    <td>
                      <TextFormat type="date" value={atencion.ultimoParto} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{atencion.mamografia ? 'true' : 'false'}</td>
                    <td>{atencion.medicamentosAntecedentes}</td>
                    <td>{atencion.esquemaVacunacion}</td>
                    <td>{atencion.fuma ? 'true' : 'false'}</td>
                    <td>{atencion.alcohol ? 'true' : 'false'}</td>
                    <td>{atencion.sustanciasPsicoactivas ? 'true' : 'false'}</td>
                    <td>{atencion.revisionPorSistemas}</td>
                    <td>{atencion.peso}</td>
                    <td>{atencion.talla}</td>
                    <td>{atencion.imc}</td>
                    <td>{atencion.fc}</td>
                    <td>{atencion.fr}</td>
                    <td>{atencion.temperatura}</td>
                    <td>{atencion.saturacion}</td>
                    <td>{atencion.hemoglobina}</td>
                    <td>{atencion.glucometria}</td>
                    <td>{atencion.circunferenciaBrazo}</td>
                    <td>{atencion.circunferenciaAbdominal}</td>
                    <td>{atencion.hallazgosExamenFisico}</td>
                    <td>{atencion.valoracionNutricional}</td>
                    <td>{atencion.diagnosticoPrincipal}</td>
                    <td>{atencion.diagnosticoSecundario}</td>
                    <td>{atencion.medicamentos}</td>
                    <td>{atencion.procedimientos}</td>
                    <td>{atencion.observacionesTratamiento}</td>
                    <td>{atencion.recomendaciones}</td>
                    <td>{atencion.destino}</td>
                    <td>
                      <TextFormat type="date" value={atencion.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={atencion.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{atencion.brigada ? <Link to={`brigada/${atencion.brigada.id}`}>{atencion.brigada.descripcion}</Link> : ''}</td>
                    <td>{atencion.paciente ? <Link to={`paciente/${atencion.paciente.id}`}>{atencion.paciente.nombre}</Link> : ''}</td>
                    <td>{atencion.usuario ? <Link to={`usuario/${atencion.usuario.id}`}>{atencion.usuario.nombre}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${atencion.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${atencion.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${atencion.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="hisBrigadaSaludApp.atencion.home.notFound">No Atencions found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ atencion }: IRootState) => ({
  atencionList: atencion.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Atencion);
