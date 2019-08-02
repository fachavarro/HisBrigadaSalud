import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAtencion } from 'app/shared/model/atencion.model';
import { getEntities as getAtencions } from 'app/entities/atencion/atencion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './procedimiento.reducer';
import { IProcedimiento } from 'app/shared/model/procedimiento.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProcedimientoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProcedimientoUpdateState {
  isNew: boolean;
  atencionId: string;
}

export class ProcedimientoUpdate extends React.Component<IProcedimientoUpdateProps, IProcedimientoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      atencionId: '0',
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

    this.props.getAtencions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { procedimientoEntity } = this.props;
      const entity = {
        ...procedimientoEntity,
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
    this.props.history.push('/entity/procedimiento');
  };

  render() {
    const { procedimientoEntity, atencions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.procedimiento.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.procedimiento.home.createOrEditLabel">Create or edit a Procedimiento</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : procedimientoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="procedimiento-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="procedimiento-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nombreProcedimientoLabel" for="procedimiento-nombreProcedimiento">
                    <Translate contentKey="hisBrigadaSaludApp.procedimiento.nombreProcedimiento">Nombre Procedimiento</Translate>
                  </Label>
                  <AvField id="procedimiento-nombreProcedimiento" type="text" name="nombreProcedimiento" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/procedimiento" replace color="info">
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
  atencions: storeState.atencion.entities,
  procedimientoEntity: storeState.procedimiento.entity,
  loading: storeState.procedimiento.loading,
  updating: storeState.procedimiento.updating,
  updateSuccess: storeState.procedimiento.updateSuccess
});

const mapDispatchToProps = {
  getAtencions,
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
)(ProcedimientoUpdate);
