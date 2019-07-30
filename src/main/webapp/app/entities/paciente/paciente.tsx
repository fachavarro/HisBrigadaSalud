import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Paciente extends React.Component<IPacienteProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { pacienteList, match } = this.props;
    return (
      <div>
        <h2 id="paciente-heading">
          <Translate contentKey="hisBrigadaSaludApp.paciente.home.title">Pacientes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hisBrigadaSaludApp.paciente.home.createLabel">Create new Paciente</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {pacienteList && pacienteList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.tipoDoc">Tipo Doc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.numeroDocumento">Numero Documento</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.nombre">Nombre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.apellido">Apellido</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.genero">Genero</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.fechaNacimiento">Fecha Nacimiento</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.acudiente">Acudiente</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.ocupacion">Ocupacion</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.afiliadoSSS">Afiliado SSS</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.cualSSS">Cual SSS</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.nacionalidad">Nacionalidad</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.barrioVive">Barrio Vive</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.numeroTelefono">Numero Telefono</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.createdAt">Created At</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.paciente.updatedAt">Updated At</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {pacienteList.map((paciente, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${paciente.id}`} color="link" size="sm">
                        {paciente.id}
                      </Button>
                    </td>
                    <td>{paciente.tipoDoc}</td>
                    <td>{paciente.numeroDocumento}</td>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.apellido}</td>
                    <td>{paciente.genero}</td>
                    <td>{paciente.fechaNacimiento}</td>
                    <td>{paciente.acudiente}</td>
                    <td>{paciente.ocupacion}</td>
                    <td>{paciente.afiliadoSSS ? 'true' : 'false'}</td>
                    <td>{paciente.cualSSS}</td>
                    <td>{paciente.nacionalidad}</td>
                    <td>{paciente.barrioVive}</td>
                    <td>{paciente.numeroTelefono}</td>
                    <td>
                      <TextFormat type="date" value={paciente.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={paciente.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${paciente.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${paciente.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${paciente.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="hisBrigadaSaludApp.paciente.home.notFound">No Pacientes found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ paciente }: IRootState) => ({
  pacienteList: paciente.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paciente);
