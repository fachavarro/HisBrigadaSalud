import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsuarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UsuarioDetail extends React.Component<IUsuarioDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { usuarioEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hisBrigadaSaludApp.usuario.detail.title">Usuario</Translate> [<b>{usuarioEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tipoDoc">
                <Translate contentKey="hisBrigadaSaludApp.usuario.tipoDoc">Tipo Doc</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.tipoDoc}</dd>
            <dt>
              <span id="numeroDocumento">
                <Translate contentKey="hisBrigadaSaludApp.usuario.numeroDocumento">Numero Documento</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.numeroDocumento}</dd>
            <dt>
              <span id="nombre">
                <Translate contentKey="hisBrigadaSaludApp.usuario.nombre">Nombre</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.nombre}</dd>
            <dt>
              <span id="apellido">
                <Translate contentKey="hisBrigadaSaludApp.usuario.apellido">Apellido</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.apellido}</dd>
            <dt>
              <span id="genero">
                <Translate contentKey="hisBrigadaSaludApp.usuario.genero">Genero</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.genero}</dd>
            <dt>
              <span id="especialidad">
                <Translate contentKey="hisBrigadaSaludApp.usuario.especialidad">Especialidad</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.especialidad}</dd>
            <dt>
              <span id="nombreUsuario">
                <Translate contentKey="hisBrigadaSaludApp.usuario.nombreUsuario">Nombre Usuario</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.nombreUsuario}</dd>
            <dt>
              <span id="contrasena">
                <Translate contentKey="hisBrigadaSaludApp.usuario.contrasena">Contrasena</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.contrasena}</dd>
            <dt>
              <span id="cargadoSistema">
                <Translate contentKey="hisBrigadaSaludApp.usuario.cargadoSistema">Cargado Sistema</Translate>
              </span>
            </dt>
            <dd>{usuarioEntity.cargadoSistema ? 'true' : 'false'}</dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="hisBrigadaSaludApp.usuario.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={usuarioEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">
                <Translate contentKey="hisBrigadaSaludApp.usuario.updatedAt">Updated At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={usuarioEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/usuario" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/usuario/${usuarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ usuario }: IRootState) => ({
  usuarioEntity: usuario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsuarioDetail);
