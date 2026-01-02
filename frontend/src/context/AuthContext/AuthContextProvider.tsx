import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

function AuthContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("access_token", newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const context = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
