import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Procedimiento from './procedimiento';
import ProcedimientoDetail from './procedimiento-detail';
import ProcedimientoUpdate from './procedimiento-update';
import ProcedimientoDeleteDialog from './procedimiento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProcedimientoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProcedimientoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProcedimientoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Procedimiento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProcedimientoDeleteDialog} />
  </>
);

export default Routes;
