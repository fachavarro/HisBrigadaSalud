import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Brigada from './brigada';
import BrigadaDetail from './brigada-detail';
import BrigadaUpdate from './brigada-update';
import BrigadaDeleteDialog from './brigada-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BrigadaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BrigadaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BrigadaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Brigada} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BrigadaDeleteDialog} />
  </>
);

export default Routes;
