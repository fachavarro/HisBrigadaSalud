import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBrigada } from 'app/shared/model/brigada.model';
import { getEntities as getBrigadas } from 'app/entities/brigada/brigada.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import { getEntity, updateEntity, createEntity, reset } from './atencion.reducer';
import { IAtencion } from 'app/shared/model/atencion.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtencionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtencionUpdateState {
  isNew: boolean;
  brigadaId: string;
  pacienteId: string;
  usuarioId: string;
}

export class AtencionUpdate extends React.Component<IAtencionUpdateProps, IAtencionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      brigadaId: '0',
      pacienteId: '0',
      usuarioId: '0',
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

    this.props.getBrigadas();
    this.props.getPacientes();
    this.props.getUsuarios();
  }

  saveEntity = (event, errors, values) => {
    values.fecha = convertDateTimeToServer(values.fecha);
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const { atencionEntity } = this.props;
      const entity = {
        ...atencionEntity,
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
    this.props.history.push('/entity/atencion');
  };

  render() {
    const { atencionEntity, brigadas, pacientes, usuarios, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.atencion.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.atencion.home.createOrEditLabel">Create or edit a Atencion</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : atencionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="atencion-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="atencion-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="fechaLabel" for="atencion-fecha">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.fecha">Fecha</Translate>
                  </Label>
                  <AvInput
                    id="atencion-fecha"
                    type="datetime-local"
                    className="form-control"
                    name="fecha"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.atencionEntity.fecha)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="especialidadLabel" for="atencion-especialidad">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.especialidad">Especialidad</Translate>
                  </Label>
                  <AvField
                    id="atencion-especialidad"
                    type="text"
                    name="especialidad"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="otraEspecialidadLabel" for="atencion-otraEspecialidad">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.otraEspecialidad">Otra Especialidad</Translate>
                  </Label>
                  <AvField id="atencion-otraEspecialidad" type="text" name="otraEspecialidad" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="atencion-createdAt">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="atencion-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.atencionEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="atencion-updatedAt">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.updatedAt">Updated At</Translate>
                  </Label>
                  <AvInput
                    id="atencion-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.atencionEntity.updatedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-brigada">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.brigada">Brigada</Translate>
                  </Label>
                  <AvInput id="atencion-brigada" type="select" className="form-control" name="brigada.id">
                    <option value="" key="0" />
                    {brigadas
                      ? brigadas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.descripcion}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-paciente">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.paciente">Paciente</Translate>
                  </Label>
                  <AvInput id="atencion-paciente" type="select" className="form-control" name="paciente.id">
                    <option value="" key="0" />
                    {pacientes
                      ? pacientes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nombre} {otherEntity.apellido}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="atencion-usuario">
                    <Translate contentKey="hisBrigadaSaludApp.atencion.usuario">Usuario</Translate>
                  </Label>
                  <AvInput id="atencion-usuario" type="select" className="form-control" name="usuario.id">
                    <option value="" key="0" />
                    {usuarios
                      ? usuarios.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nombre} {otherEntity.apellido}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/atencion" replace color="info">
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
  brigadas: storeState.brigada.entities,
  pacientes: storeState.paciente.entities,
  usuarios: storeState.usuario.entities,
  atencionEntity: storeState.atencion.entity,
  loading: storeState.atencion.loading,
  updating: storeState.atencion.updating,
  updateSuccess: storeState.atencion.updateSuccess
});

const mapDispatchToProps = {
  getBrigadas,
  getPacientes,
  getUsuarios,
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
)(AtencionUpdate);
