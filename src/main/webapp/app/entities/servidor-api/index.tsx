import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ServidorAPI from './servidor-api';
import ServidorAPIDetail from './servidor-api-detail';
import ServidorAPIUpdate from './servidor-api-update';
import ServidorAPIDeleteDialog from './servidor-api-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ServidorAPIUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ServidorAPIUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ServidorAPIDetail} />
      <ErrorBoundaryRoute path={match.url} component={ServidorAPI} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ServidorAPIDeleteDialog} />
  </>
);

export default Routes;
