import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './servidor-api.reducer';
import { IServidorAPI } from 'app/shared/model/servidor-api.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServidorAPIDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ServidorAPIDetail extends React.Component<IServidorAPIDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { servidorAPIEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hisBrigadaSaludApp.servidorAPI.detail.title">ServidorAPI</Translate> [<b>{servidorAPIEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="protocolo">
                <Translate contentKey="hisBrigadaSaludApp.servidorAPI.protocolo">Protocolo</Translate>
              </span>
            </dt>
            <dd>{servidorAPIEntity.protocolo}</dd>
            <dt>
              <span id="server">
                <Translate contentKey="hisBrigadaSaludApp.servidorAPI.server">Server</Translate>
              </span>
            </dt>
            <dd>{servidorAPIEntity.server}</dd>
            <dt>
              <span id="port">
                <Translate contentKey="hisBrigadaSaludApp.servidorAPI.port">Port</Translate>
              </span>
            </dt>
            <dd>{servidorAPIEntity.port}</dd>
            <dt>
              <span id="estado">
                <Translate contentKey="hisBrigadaSaludApp.servidorAPI.estado">Estado</Translate>
              </span>
            </dt>
            <dd>{servidorAPIEntity.estado}</dd>
            <dt>
              <span id="cargadoSistema">
                <Translate contentKey="hisBrigadaSaludApp.servidorAPI.cargadoSistema">Cargado Sistema</Translate>
              </span>
            </dt>
            <dd>{servidorAPIEntity.cargadoSistema ? 'true' : 'false'}</dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="hisBrigadaSaludApp.servidorAPI.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={servidorAPIEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">
                <Translate contentKey="hisBrigadaSaludApp.servidorAPI.updatedAt">Updated At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={servidorAPIEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/servidor-api" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/servidor-api/${servidorAPIEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ servidorAPI }: IRootState) => ({
  servidorAPIEntity: servidorAPI.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServidorAPIDetail);
