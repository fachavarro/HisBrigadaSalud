import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteUpdateState {
  isNew: boolean;
}

export class PacienteUpdate extends React.Component<IPacienteUpdateProps, IPacienteUpdateState> {
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
      const { pacienteEntity } = this.props;
      const entity = {
        ...pacienteEntity,
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
    this.props.history.push('/entity/paciente');
  };

  render() {
    const { pacienteEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.paciente.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.paciente.home.createOrEditLabel">Create or edit a Paciente</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pacienteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="paciente-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="paciente-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tipoDocLabel" for="paciente-tipoDoc">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.tipoDoc">Tipo Doc</Translate>
                  </Label>
                  <AvField
                    id="paciente-tipoDoc"
                    type="text"
                    name="tipoDoc"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numeroDocumentoLabel" for="paciente-numeroDocumento">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.numeroDocumento">Numero Documento</Translate>
                  </Label>
                  <AvField
                    id="paciente-numeroDocumento"
                    type="text"
                    name="numeroDocumento"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nombreLabel" for="paciente-nombre">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.nombre">Nombre</Translate>
                  </Label>
                  <AvField
                    id="paciente-nombre"
                    type="text"
                    name="nombre"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="apellidoLabel" for="paciente-apellido">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.apellido">Apellido</Translate>
                  </Label>
                  <AvField
                    id="paciente-apellido"
                    type="text"
                    name="apellido"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="generoLabel" for="paciente-genero">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.genero">Genero</Translate>
                  </Label>
                  <AvField
                    id="paciente-genero"
                    type="text"
                    name="genero"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fechaNacimientoLabel" for="paciente-fechaNacimiento">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.fechaNacimiento">Fecha Nacimiento</Translate>
                  </Label>
                  <AvField
                    id="paciente-fechaNacimiento"
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="acudienteLabel" for="paciente-acudiente">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.acudiente">Acudiente</Translate>
                  </Label>
                  <AvField id="paciente-acudiente" type="text" name="acudiente" />
                </AvGroup>
                <AvGroup>
                  <Label id="ocupacionLabel" for="paciente-ocupacion">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.ocupacion">Ocupacion</Translate>
                  </Label>
                  <AvField
                    id="paciente-ocupacion"
                    type="text"
                    name="ocupacion"
                    validate={{
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="afiliadoSSSLabel" check>
                    <AvInput id="paciente-afiliadoSSS" type="checkbox" className="form-control" name="afiliadoSSS" />
                    <Translate contentKey="hisBrigadaSaludApp.paciente.afiliadoSSS">Afiliado SSS</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="cualSSSLabel" for="paciente-cualSSS">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.cualSSS">Cual SSS</Translate>
                  </Label>
                  <AvField
                    id="paciente-cualSSS"
                    type="text"
                    name="cualSSS"
                    validate={{
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nacionalidadLabel" for="paciente-nacionalidad">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.nacionalidad">Nacionalidad</Translate>
                  </Label>
                  <AvField
                    id="paciente-nacionalidad"
                    type="text"
                    name="nacionalidad"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="barrioViveLabel" for="paciente-barrioVive">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.barrioVive">Barrio Vive</Translate>
                  </Label>
                  <AvField
                    id="paciente-barrioVive"
                    type="text"
                    name="barrioVive"
                    validate={{
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numeroTelefonoLabel" for="paciente-numeroTelefono">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.numeroTelefono">Numero Telefono</Translate>
                  </Label>
                  <AvField
                    id="paciente-numeroTelefono"
                    type="text"
                    name="numeroTelefono"
                    validate={{
                      maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="paciente-createdAt">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="paciente-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.pacienteEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="paciente-updatedAt">
                    <Translate contentKey="hisBrigadaSaludApp.paciente.updatedAt">Updated At</Translate>
                  </Label>
                  <AvInput
                    id="paciente-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.pacienteEntity.updatedAt)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/paciente" replace color="info">
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
  pacienteEntity: storeState.paciente.entity,
  loading: storeState.paciente.loading,
  updating: storeState.paciente.updating,
  updateSuccess: storeState.paciente.updateSuccess
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
)(PacienteUpdate);
