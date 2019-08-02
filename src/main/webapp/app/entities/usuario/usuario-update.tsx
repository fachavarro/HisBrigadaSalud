import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUsuarioUpdateState {
  isNew: boolean;
}

export class UsuarioUpdate extends React.Component<IUsuarioUpdateProps, IUsuarioUpdateState> {
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
      const { usuarioEntity } = this.props;
      const entity = {
        ...usuarioEntity,
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
    this.props.history.push('/entity/usuario');
  };

  render() {
    const { usuarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hisBrigadaSaludApp.usuario.home.createOrEditLabel">
              <Translate contentKey="hisBrigadaSaludApp.usuario.home.createOrEditLabel">Create or edit a Usuario</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : usuarioEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="usuario-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="usuario-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tipoDocLabel" for="usuario-tipoDoc">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.tipoDoc">Tipo Doc</Translate>
                  </Label>
                  <AvField
                    id="usuario-tipoDoc"
                    type="text"
                    name="tipoDoc"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numeroDocumentoLabel" for="usuario-numeroDocumento">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.numeroDocumento">Numero Documento</Translate>
                  </Label>
                  <AvField
                    id="usuario-numeroDocumento"
                    type="text"
                    name="numeroDocumento"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nombreLabel" for="usuario-nombre">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.nombre">Nombre</Translate>
                  </Label>
                  <AvField
                    id="usuario-nombre"
                    type="text"
                    name="nombre"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="apellidoLabel" for="usuario-apellido">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.apellido">Apellido</Translate>
                  </Label>
                  <AvField
                    id="usuario-apellido"
                    type="text"
                    name="apellido"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="generoLabel" for="usuario-genero">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.genero">Genero</Translate>
                  </Label>
                  <AvField
                    id="usuario-genero"
                    type="text"
                    name="genero"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="especialidadLabel" for="usuario-especialidad">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.especialidad">Especialidad</Translate>
                  </Label>
                  <AvField
                    id="usuario-especialidad"
                    type="text"
                    name="especialidad"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nombreUsuarioLabel" for="usuario-nombreUsuario">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.nombreUsuario">Nombre Usuario</Translate>
                  </Label>
                  <AvField
                    id="usuario-nombreUsuario"
                    type="text"
                    name="nombreUsuario"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contrasenaLabel" for="usuario-contrasena">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.contrasena">Contrasena</Translate>
                  </Label>
                  <AvField
                    id="usuario-contrasena"
                    type="text"
                    name="contrasena"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="usuario-createdAt">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="usuario-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.usuarioEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="usuario-updatedAt">
                    <Translate contentKey="hisBrigadaSaludApp.usuario.updatedAt">Updated At</Translate>
                  </Label>
                  <AvInput
                    id="usuario-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.usuarioEntity.updatedAt)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/usuario" replace color="info">
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
  usuarioEntity: storeState.usuario.entity,
  loading: storeState.usuario.loading,
  updating: storeState.usuario.updating,
  updateSuccess: storeState.usuario.updateSuccess
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
)(UsuarioUpdate);
