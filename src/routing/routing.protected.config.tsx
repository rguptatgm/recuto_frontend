import { inject, observer } from "mobx-react";
import { Navigate, Outlet } from "react-router-dom";
import UserStore from "../stores/user.store";
import React from "react";

interface ProtectedRouteProps {
  userStore?: UserStore;
}

const ProtectedRoute = ({
  userStore,
}: ProtectedRouteProps): React.ReactElement | null => {
  const user = userStore?.user;

  if (user == null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default inject("userStore")(observer(ProtectedRoute));
