import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, path }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

export default PrivateRouter;
