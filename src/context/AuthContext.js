import { useContext, createContext } from "react";

const AuthContext = createContext();

//Provider
export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//usa o contexto aqui, sem hook
export function useAuthValue() {
  return useContext(AuthContext);
}
