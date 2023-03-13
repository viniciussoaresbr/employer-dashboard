import React from 'react';
import { createContext, ReactNode } from 'react';
import { api } from '../../service/api';
import { ENDPOINTS } from '../../service/endpoints';
import { IUserById, IUserSignUp } from '../../types/user';

interface IUserContext {
  registerUser: (user: IUserSignUp) => Promise<{ message: string }>;
  getUserById: (userId: string | null) => Promise<IUserById>;
}

export const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const registerUser = async (user: IUserSignUp) => {
    const response = await api.post(ENDPOINTS.user, user);
    return response.data;
  };

  const getUserById = async (userId: string | null) => {
    const authToken = localStorage.getItem('token');
    if (!userId) return null;
    const response = await api.get(`${ENDPOINTS.user}/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data;
  };

  return (
    <UserContext.Provider value={{ registerUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
