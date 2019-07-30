import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './brigada.reducer';
import { IBrigada } from 'app/shared/model/brigada.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBrigadaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BrigadaDetail extends React.Component<IBrigadaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { brigadaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hisBrigadaSaludApp.brigada.detail.title">Brigada</Translate> [<b>{brigadaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="descripcion">
                <Translate contentKey="hisBrigadaSaludApp.brigada.descripcion">Descripcion</Translate>
              </span>
            </dt>
            <dd>{brigadaEntity.descripcion}</dd>
            <dt>
              <span id="lugar">
                <Translate contentKey="hisBrigadaSaludApp.brigada.lugar">Lugar</Translate>
              </span>
            </dt>
            <dd>{brigadaEntity.lugar}</dd>
            <dt>
              <span id="ciudad">
                <Translate contentKey="hisBrigadaSaludApp.brigada.ciudad">Ciudad</Translate>
              </span>
            </dt>
            <dd>{brigadaEntity.ciudad}</dd>
            <dt>
              <span id="fechai">
                <Translate contentKey="hisBrigadaSaludApp.brigada.fechai">Fechai</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={brigadaEntity.fechai} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fechaf">
                <Translate contentKey="hisBrigadaSaludApp.brigada.fechaf">Fechaf</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={brigadaEntity.fechaf} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="hisBrigadaSaludApp.brigada.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={brigadaEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">
                <Translate contentKey="hisBrigadaSaludApp.brigada.updatedAt">Updated At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={brigadaEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/brigada" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/brigada/${brigadaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ brigada }: IRootState) => ({
  brigadaEntity: brigada.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrigadaDetail);
