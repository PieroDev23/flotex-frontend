import React, { PropsWithChildren } from "react";
import { useLogout, useUser } from "../hooks/api";
import { useNavigate } from "react-router";



export type User = {
  id: number;
  phone: number;
  email: string;
  lastname: string;
  firstname: string;
  role: "CUSTOMER" | "ADMIN";
  active: "ACTIVE" | "INACTIVE";
}

type AuthContextValues = {
  user: User | null;
  isMutating: boolean;
  isLoading: boolean;
  onLogout: () => void;
  refreshUser: () => void;
}


const AuthContext = React.createContext({} as AuthContextValues);
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: user, ...rest } = useUser();
  const { trigger, isMutating } = useLogout();
  const navigate = useNavigate();

  const refreshUser = () => {
    rest.mutate();
  }

  const onLogout = async () => {
    await trigger();
    // clean cache and stale data;
    rest.mutate(null, false);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{
      user,
      onLogout,
      refreshUser,
      isMutating,
      isLoading: rest.isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}