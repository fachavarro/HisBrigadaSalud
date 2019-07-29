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
                    <td>
                      <TextFormat type="date" value={atencion.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={atencion.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{atencion.brigada ? <Link to={`brigada/${atencion.brigada.id}`}>{atencion.brigada.descripcion}</Link> : ''}</td>
                    <td>{atencion.paciente ? <Link to={`paciente/${atencion.paciente.id}`}>{atencion.paciente.nombre} {atencion.paciente.apellido}</Link> : ''}</td>
                    <td>{atencion.usuario ? <Link to={`usuario/${atencion.usuario.id}`}>{atencion.usuario.nombre} {atencion.usuario.apellido}</Link> : ''}</td>
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
