import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './servidor-api.reducer';
import { IServidorAPI } from 'app/shared/model/servidor-api.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServidorAPIUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServidorAPIUpdateState {
  isNew: boolean;
}

export class ServidorAPIUpdate extends React.Component<IServidorAPIUpdateProps, IServidorAPIUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const { servidorAPIEntity } = this.props;
      const entity = {
        ...servidorAPIEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/servidor-api');
  };

  render() {
    const { servidorAPIEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.servidorAPI.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.servidorAPI.home.createOrEditLabel">Create or edit a ServidorAPI</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : servidorAPIEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="servidor-api-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="servidor-api-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="protocoloLabel" for="servidor-api-protocolo">
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.protocolo">Protocolo</Translate>
                  </Label>
                  <AvField
                    id="servidor-api-protocolo"
                    type="text"
                    name="protocolo"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="serverLabel" for="servidor-api-server">
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.server">Server</Translate>
                  </Label>
                  <AvField
                    id="servidor-api-server"
                    type="text"
                    name="server"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="portLabel" for="servidor-api-port">
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.port">Port</Translate>
                  </Label>
                  <AvField id="servidor-api-port" type="text" name="port" />
                </AvGroup>
                <AvGroup>
                  <Label id="estadoLabel" for="servidor-api-estado">
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.estado">Estado</Translate>
                  </Label>
                  <AvField id="servidor-api-estado" type="text" name="estado" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="servidor-api-createdAt">
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="servidor-api-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.servidorAPIEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="servidor-api-updatedAt">
                    <Translate contentKey="hisBrigadaSaludApp.servidorAPI.updatedAt">Updated At</Translate>
                  </Label>
                  <AvInput
                    id="servidor-api-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.servidorAPIEntity.updatedAt)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/servidor-api" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  servidorAPIEntity: storeState.servidorAPI.entity,
  loading: storeState.servidorAPI.loading,
  updating: storeState.servidorAPI.updating,
  updateSuccess: storeState.servidorAPI.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServidorAPIUpdate);
