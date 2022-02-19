import React from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }: Props) => {
  const { isAdmin } = React.useContext(AuthContext);
  const location = useLocation();

  return isAdmin() ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location }} />
  );
};

export default RequireAuth;
