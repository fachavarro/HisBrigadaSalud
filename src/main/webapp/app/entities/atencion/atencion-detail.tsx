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
            <dd>{atencionEntity.brigada ? atencionEntity.brigada.id : ''}</dd>
            <dt>
              <Translate contentKey="hisBrigadaSaludApp.atencion.paciente">Paciente</Translate>
            </dt>
            <dd>{atencionEntity.paciente ? atencionEntity.paciente.id : ''}</dd>
            <dt>
              <Translate contentKey="hisBrigadaSaludApp.atencion.usuario">Usuario</Translate>
            </dt>
            <dd>{atencionEntity.usuario ? atencionEntity.usuario.id : ''}</dd>
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
