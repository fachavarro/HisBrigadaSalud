import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './servidor-api.reducer';
import { IServidorAPI } from 'app/shared/model/servidor-api.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServidorAPIProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ServidorAPI extends React.Component<IServidorAPIProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { servidorAPIList, match } = this.props;
    return (
      <div>
        <h2 id="servidor-api-heading">
          <Translate contentKey="hisBrigadaSaludApp.servidorAPI.home.title">Servidor APIS</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hisBrigadaSaludApp.servidorAPI.home.createLabel">Create new Servidor API</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {servidorAPIList && servidorAPIList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.protocolo">Protocolo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.server">Server</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.port">Port</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.estado">Estado</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.createdAt">Created At</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.updatedAt">Updated At</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {servidorAPIList.map((servidorAPI, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${servidorAPI.id}`} color="link" size="sm">
                        {servidorAPI.id}
                      </Button>
                    </td>
                    <td>{servidorAPI.protocolo}</td>
                    <td>{servidorAPI.server}</td>
                    <td>{servidorAPI.port}</td>
                    <td>{servidorAPI.estado}</td>
                    <td>
                      <TextFormat type="date" value={servidorAPI.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={servidorAPI.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${servidorAPI.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${servidorAPI.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${servidorAPI.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="hisBrigadaSaludApp.servidorAPI.home.notFound">No Servidor APIS found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ servidorAPI }: IRootState) => ({
  servidorAPIList: servidorAPI.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServidorAPI);
