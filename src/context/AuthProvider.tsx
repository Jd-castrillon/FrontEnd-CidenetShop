import React, { FC } from "react";

import { AuthContextType } from "../types/AuthContextType";
import { AuthUserType } from "../types/AuthUserType";

const contextDefaultValues: AuthContextType = {
  userOnline: [],
  adminOnline: [],
  addUserOnline: () => {},
  addAdminOnline: () => {},
  removeUserOnline: () => {},
  isOnline: () => 0,
  isAdmin: () => false,
};

export const AuthContext =
  React.createContext<AuthContextType>(contextDefaultValues);

const AuthProvider: FC = ({ children }) => {
  const userOnline: AuthUserType[] = [];
  const adminOnline: AuthUserType[] = [];

  const addAdminOnline = (admin: AuthUserType) => {
    if (admin.token !== undefined && admin !== null) {
      if (adminOnline.length > 0) {
        userOnline.pop();
        adminOnline.pop();
        adminOnline.push(admin);
      } else {
        adminOnline.push(admin);
      }
    }
  };

  const addUserOnline = (user: AuthUserType) => {
    if (user.token !== undefined && user !== null) {
      if (userOnline.length > 0) {
        userOnline.pop();
        userOnline.push(user);
      } else {
        userOnline.push(user);
      }
    }
  };

  const removeUserOnline = () => {
    userOnline.pop();
  };

  const isOnline = () => {
    return userOnline.length;
  };

  const isAdmin = () => {
    if (
      userOnline.length > 0 &&
      userOnline[0].authorities.find(
        (authority) => authority.authority === "admin"
      )
    ) {
      return true;
    }
    return false;
    //return true;
  };

  return (
    <AuthContext.Provider
      value={{
        adminOnline,
        addAdminOnline,
        userOnline,
        addUserOnline,
        removeUserOnline,
        isOnline,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
