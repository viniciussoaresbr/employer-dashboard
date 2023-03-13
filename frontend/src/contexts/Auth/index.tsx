import React, { createContext, ReactNode } from 'react';
import { api } from '../../service/api';
import { ENDPOINTS } from '../../service/endpoints';
import { IUserSignIn } from '../../types/user';

export interface IAuthResponse {
  userId: string;
  accessToken: string;
}

interface IAuthContext {
  handleLogin: (user: IUserSignIn) => Promise<IAuthResponse>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const handleLogin = async (user: IUserSignIn) => {
    const response = await api.post(ENDPOINTS.login, user);
    return response.data;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
