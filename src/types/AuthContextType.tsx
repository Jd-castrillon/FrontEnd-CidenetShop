import { AuthUserType } from "./AuthUserType";
export type AuthContextType = {
  userOnline: AuthUserType[];
  adminOnline: AuthUserType[];
  addUserOnline: (user:AuthUserType) => void;
  addAdminOnline: (user:AuthUserType) => void;
  removeUserOnline: () => void;
  isOnline: () => number;
  isAdmin : () => boolean;
  
};

export type UserInformation = {
  name: "";
  email: "";
};
