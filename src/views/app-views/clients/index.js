import Loading from "components/shared-components/Loading";
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Clients = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/user-list`} />

      <Route
        path={`${match.url}/user-list`}
        component={React.lazy(() => import("./user-list"))}
      />
    </Switch>
  </Suspense>
);
export default Clients;
