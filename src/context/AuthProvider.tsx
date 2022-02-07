import React, { FC } from "react";

import { AuthContextType } from "../types/AuthContextType";
import { AuthUserType } from "../types/AuthUserType";

const contextDefaultValues: AuthContextType = {
  userOnline: [],
  addUserOnline: () => {},
  removeUserOnline: () => {},
  isOnline: () => 0,
};

export const AuthContext =
  React.createContext<AuthContextType>(contextDefaultValues);

const AuthProvider: FC = ({ children }) => {
  const userOnline: AuthUserType[] = [];

  const addUserOnline = (user: AuthUserType) => {
    if (userOnline.length > 0 ) {
      userOnline.pop();
      userOnline.push(user);
    } else {
      userOnline.push(user);
    }
  };

  const removeUserOnline = () => {
    userOnline.pop();
  };

  const isOnline = () => {
    console.log(userOnline.length);
    return userOnline.length;
  };

  return (
    <AuthContext.Provider
      value={{
        userOnline,
        addUserOnline,
        removeUserOnline,
        isOnline,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
