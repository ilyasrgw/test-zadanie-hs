import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./home`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/clients`}
          component={lazy(() => import("./clients"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/settings`}
          component={lazy(() => import("./settings"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/catalog`}
          component={lazy(() => import("./catalog"))}
        />

        <Route
          path={`${APP_PREFIX_PATH}/planner`}
          component={lazy(() => import("./planner/Planner"))}
        />

        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
