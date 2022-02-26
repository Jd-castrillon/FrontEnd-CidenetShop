import React, { FC } from "react";

import { AuthContextType } from "../types/AuthContextType";
import { AuthUserType } from "../types/AuthUserType";

const contextDefaultValues: AuthContextType = {
  
  getToken: () => "",
  logIn: () => {},
  logOut: () => {},
  isLogged: () => false,
  isAdmin: () => false,
};

export const AuthContext =
  React.createContext<AuthContextType>(contextDefaultValues);

const AuthProvider: FC = ({ children }) => {
  

  const logIn = () => {
    const auth = localStorage.getItem("AuthUser");
    if (auth !== null && auth !== undefined) {
      const userAuth: AuthUserType = JSON.parse(auth.toString());
      console.table(userAuth);
     
    }
  };

  const logOut = () => {
    const auth = localStorage.getItem("AuthUser");
    if (auth !== null && auth !== undefined) {
      localStorage.removeItem("AuthUser");
      
    }
  };

  const getToken = () => {
    const auth = localStorage.getItem("AuthUser");
    if (auth !== null && auth !== undefined) {
      const user: AuthUserType = JSON.parse(auth);
      return `Bearer ${user.token}`;
    }
    return "";
  };

  const isLogged = () => {
    const auth = localStorage.getItem("AuthUser");
    if (auth !== null && auth !== undefined) {
      return true;
    }
    return false;
  };

  const isAdmin = () => {
    const auth = localStorage.getItem("AuthUser");
    if (auth !== null && auth !== undefined) {
      const user: AuthUserType = JSON.parse(auth);
      if (
        user &&
        user.authorities.find((authority) => authority.authority === "admin")
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        getToken,
        logOut,

        isLogged,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
