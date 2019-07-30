import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDetail extends React.Component<IPacienteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hisBrigadaSaludApp.paciente.detail.title">Paciente</Translate> [<b>{pacienteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tipoDoc">
                <Translate contentKey="hisBrigadaSaludApp.paciente.tipoDoc">Tipo Doc</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.tipoDoc}</dd>
            <dt>
              <span id="numeroDocumento">
                <Translate contentKey="hisBrigadaSaludApp.paciente.numeroDocumento">Numero Documento</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.numeroDocumento}</dd>
            <dt>
              <span id="nombre">
                <Translate contentKey="hisBrigadaSaludApp.paciente.nombre">Nombre</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.nombre}</dd>
            <dt>
              <span id="apellido">
                <Translate contentKey="hisBrigadaSaludApp.paciente.apellido">Apellido</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.apellido}</dd>
            <dt>
              <span id="genero">
                <Translate contentKey="hisBrigadaSaludApp.paciente.genero">Genero</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.genero}</dd>
            <dt>
              <span id="fechaNacimiento">
                <Translate contentKey="hisBrigadaSaludApp.paciente.fechaNacimiento">Fecha Nacimiento</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.fechaNacimiento}</dd>
            <dt>
              <span id="acudiente">
                <Translate contentKey="hisBrigadaSaludApp.paciente.acudiente">Acudiente</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.acudiente}</dd>
            <dt>
              <span id="ocupacion">
                <Translate contentKey="hisBrigadaSaludApp.paciente.ocupacion">Ocupacion</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.ocupacion}</dd>
            <dt>
              <span id="afiliadoSSS">
                <Translate contentKey="hisBrigadaSaludApp.paciente.afiliadoSSS">Afiliado SSS</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.afiliadoSSS ? 'true' : 'false'}</dd>
            <dt>
              <span id="cualSSS">
                <Translate contentKey="hisBrigadaSaludApp.paciente.cualSSS">Cual SSS</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.cualSSS}</dd>
            <dt>
              <span id="nacionalidad">
                <Translate contentKey="hisBrigadaSaludApp.paciente.nacionalidad">Nacionalidad</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.nacionalidad}</dd>
            <dt>
              <span id="barrioVive">
                <Translate contentKey="hisBrigadaSaludApp.paciente.barrioVive">Barrio Vive</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.barrioVive}</dd>
            <dt>
              <span id="numeroTelefono">
                <Translate contentKey="hisBrigadaSaludApp.paciente.numeroTelefono">Numero Telefono</Translate>
              </span>
            </dt>
            <dd>{pacienteEntity.numeroTelefono}</dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="hisBrigadaSaludApp.paciente.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={pacienteEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">
                <Translate contentKey="hisBrigadaSaludApp.paciente.updatedAt">Updated At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={pacienteEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/paciente" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/paciente/${pacienteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ paciente }: IRootState) => ({
  pacienteEntity: paciente.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PacienteDetail);
