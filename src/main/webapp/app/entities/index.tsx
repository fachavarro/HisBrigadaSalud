import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Brigada from './brigada';
import ServidorAPI from './servidor-api';
import Usuario from './usuario';
import Paciente from './paciente';
import Atencion from './atencion';
import Medicamento from './medicamento';
import Procedimiento from './procedimiento';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/brigada`} component={Brigada} />
      <ErrorBoundaryRoute path={`${match.url}/servidor-api`} component={ServidorAPI} />
      <ErrorBoundaryRoute path={`${match.url}/usuario`} component={Usuario} />
      <ErrorBoundaryRoute path={`${match.url}/paciente`} component={Paciente} />
      <ErrorBoundaryRoute path={`${match.url}/atencion`} component={Atencion} />
      <ErrorBoundaryRoute path={`${match.url}/medicamento`} component={Medicamento} />
      <ErrorBoundaryRoute path={`${match.url}/procedimiento`} component={Procedimiento} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
