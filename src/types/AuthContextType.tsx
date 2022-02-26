export type AuthContextType = {
  getToken: () => string;
  logIn: () => void;

  logOut: () => void;
  isLogged: () => boolean;
  isAdmin: () => boolean;
};

export type UserInformation = {
  name: "";
  email: "";
};
