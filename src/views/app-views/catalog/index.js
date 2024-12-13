import Loading from "components/shared-components/Loading";
import React, { Suspense } from "react";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

const Catalog = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/products`} />

      <Route
        path={`${match.url}/products`}
        component={React.lazy(() => import("./products"))}
      />
    </Switch>
  </Suspense>
);
export default Catalog;
