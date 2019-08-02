import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './brigada.reducer';
import { IBrigada } from 'app/shared/model/brigada.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBrigadaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBrigadaUpdateState {
  isNew: boolean;
}

export class BrigadaUpdate extends React.Component<IBrigadaUpdateProps, IBrigadaUpdateState> {
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
      const { brigadaEntity } = this.props;
      const entity = {
        ...brigadaEntity,
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
    this.props.history.push('/entity/brigada');
  };

  render() {
    const { brigadaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.brigada.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.brigada.home.createOrEditLabel">Create or edit a Brigada</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : brigadaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="brigada-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="brigada-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descripcionLabel" for="brigada-descripcion">
                    <Translate contentKey="hisBrigadaSaludApp.brigada.descripcion">Descripcion</Translate>
                  </Label>
                  <AvField
                    id="brigada-descripcion"
                    type="text"
                    name="descripcion"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lugarLabel" for="brigada-lugar">
                    <Translate contentKey="hisBrigadaSaludApp.brigada.lugar">Lugar</Translate>
                  </Label>
                  <AvField
                    id="brigada-lugar"
                    type="text"
                    name="lugar"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="ciudadLabel" for="brigada-ciudad">
                    <Translate contentKey="hisBrigadaSaludApp.brigada.ciudad">Ciudad</Translate>
                  </Label>
                  <AvField
                    id="brigada-ciudad"
                    type="text"
                    name="ciudad"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaiLabel" for="brigada-fechai">
                    <Translate contentKey="hisBrigadaSaludApp.brigada.fechai">Fechai</Translate>
                  </Label>
                  <AvField
                    id="brigada-fechai"
                    type="date"
                    className="form-control"
                    name="fechai"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechafLabel" for="brigada-fechaf">
                    <Translate contentKey="hisBrigadaSaludApp.brigada.fechaf">Fechaf</Translate>
                  </Label>
                  <AvField
                    id="brigada-fechaf"
                    type="date"
                    className="form-control"
                    name="fechaf"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="brigada-createdAt">
                    <Translate contentKey="hisBrigadaSaludApp.brigada.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="brigada-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.brigadaEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="brigada-updatedAt">
                    <Translate contentKey="hisBrigadaSaludApp.brigada.updatedAt">Updated At</Translate>
                  </Label>
                  <AvInput
                    id="brigada-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.brigadaEntity.updatedAt)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/brigada" replace color="info">
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
  brigadaEntity: storeState.brigada.entity,
  loading: storeState.brigada.loading,
  updating: storeState.brigada.updating,
  updateSuccess: storeState.brigada.updateSuccess
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
)(BrigadaUpdate);
