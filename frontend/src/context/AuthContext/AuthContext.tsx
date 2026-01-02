import { createContext } from "react";

interface AuthContextValues {
  login: (token: string) => void;
  isAuthenticated: boolean;
  token: string | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValues | undefined>(
  undefined
);
