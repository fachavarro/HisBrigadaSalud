import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Atencion from './atencion';
import AtencionDetail from './atencion-detail';
import AtencionUpdate from './atencion-update';
import AtencionDeleteDialog from './atencion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtencionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtencionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtencionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Atencion} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtencionDeleteDialog} />
  </>
);

export default Routes;
