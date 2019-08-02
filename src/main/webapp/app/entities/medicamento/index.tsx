import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Medicamento from './medicamento';
import MedicamentoDetail from './medicamento-detail';
import MedicamentoUpdate from './medicamento-update';
import MedicamentoDeleteDialog from './medicamento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MedicamentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MedicamentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MedicamentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Medicamento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MedicamentoDeleteDialog} />
  </>
);

export default Routes;
