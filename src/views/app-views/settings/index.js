import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Settings = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path="/app/settings/edit-profile"
          component={lazy(() => import("./edit-profile/EditProfile"))}
        />
        <Redirect from="/app/settings" to="/app/settings/edit-profile" />{" "}
      </Switch>
    </Suspense>
  );
};

export default Settings;
