import { AuthUserType } from "./AuthUserType";
export type AuthContextType = {
  userOnline: AuthUserType[];
  addUserOnline: (user:AuthUserType) => void;
  removeUserOnline: () => void;
  isOnline: () => number;
  
};

export type UserInformation = {
  name: "";
  email: "";
};
