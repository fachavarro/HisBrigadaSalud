import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Usuario extends React.Component<IUsuarioProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { usuarioList, match } = this.props;
    return (
      <div>
        <h2 id="usuario-heading">
          <Translate contentKey="hisBrigadaSaludApp.usuario.home.title">Usuarios</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hisBrigadaSaludApp.usuario.home.createLabel">Create new Usuario</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {usuarioList && usuarioList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.tipoDoc">Tipo Doc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.numeroDocumento">Numero Documento</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.nombre">Nombre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.apellido">Apellido</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.genero">Genero</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.especialidad">Especialidad</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.nombreUsuario">Nombre Usuario</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.contrasena">Contrasena</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.createdAt">Created At</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.usuario.updatedAt">Updated At</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {usuarioList.map((usuario, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${usuario.id}`} color="link" size="sm">
                        {usuario.id}
                      </Button>
                    </td>
                    <td>{usuario.tipoDoc}</td>
                    <td>{usuario.numeroDocumento}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.genero}</td>
                    <td>{usuario.especialidad}</td>
                    <td>{usuario.nombreUsuario}</td>
                    <td>{usuario.contrasena}</td>
                    <td>
                      <TextFormat type="date" value={usuario.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={usuario.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${usuario.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${usuario.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${usuario.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="hisBrigadaSaludApp.usuario.home.notFound">No Usuarios found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ usuario }: IRootState) => ({
  usuarioList: usuario.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usuario);
