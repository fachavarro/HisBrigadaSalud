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
import { getEntity, updateEntity, createEntity, reset } from './medicamento.reducer';
import { IMedicamento } from 'app/shared/model/medicamento.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMedicamentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMedicamentoUpdateState {
  isNew: boolean;
  atencionId: string;
}

export class MedicamentoUpdate extends React.Component<IMedicamentoUpdateProps, IMedicamentoUpdateState> {
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
      const { medicamentoEntity } = this.props;
      const entity = {
        ...medicamentoEntity,
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
    this.props.history.push('/entity/medicamento');
  };

  render() {
    const { medicamentoEntity, atencions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.medicamento.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.medicamento.home.createOrEditLabel">Create or edit a Medicamento</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : medicamentoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="medicamento-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="medicamento-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nombreMedicamentoLabel" for="medicamento-nombreMedicamento">
                    <Translate contentKey="hisBrigadaSaludApp.medicamento.nombreMedicamento">Nombre Medicamento</Translate>
                  </Label>
                  <AvField id="medicamento-nombreMedicamento" type="text" name="nombreMedicamento" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/medicamento" replace color="info">
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
  medicamentoEntity: storeState.medicamento.entity,
  loading: storeState.medicamento.loading,
  updating: storeState.medicamento.updating,
  updateSuccess: storeState.medicamento.updateSuccess
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
)(MedicamentoUpdate);
