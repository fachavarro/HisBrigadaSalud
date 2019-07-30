import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './brigada.reducer';
import { IBrigada } from 'app/shared/model/brigada.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBrigadaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Brigada extends React.Component<IBrigadaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { brigadaList, match } = this.props;
    return (
      <div>
        <h2 id="brigada-heading">
          <Translate contentKey="hisBrigadaSaludApp.brigada.home.title">Brigadas</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hisBrigadaSaludApp.brigada.home.createLabel">Create new Brigada</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {brigadaList && brigadaList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.brigada.descripcion">Descripcion</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.brigada.lugar">Lugar</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.brigada.ciudad">Ciudad</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.brigada.fechai">Fechai</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.brigada.fechaf">Fechaf</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.brigada.createdAt">Created At</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hisBrigadaSaludApp.brigada.updatedAt">Updated At</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {brigadaList.map((brigada, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${brigada.id}`} color="link" size="sm">
                        {brigada.id}
                      </Button>
                    </td>
                    <td>{brigada.descripcion}</td>
                    <td>{brigada.lugar}</td>
                    <td>{brigada.ciudad}</td>
                    <td>
                      <TextFormat type="date" value={brigada.fechai} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={brigada.fechaf} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={brigada.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={brigada.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${brigada.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${brigada.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${brigada.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="hisBrigadaSaludApp.brigada.home.notFound">No Brigadas found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ brigada }: IRootState) => ({
  brigadaList: brigada.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brigada);
