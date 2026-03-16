import React, { createContext, ReactNode } from 'react';
import { api } from '../../service/api';
import { ENDPOINTS } from '../../service/endpoints';
import { IEmployee } from '../../types/employee';

interface IEmployeeContext {
  registerEmployee: (employee: IEmployee) => Promise<{ message: string }>;
  findAllEmployees: () => Promise<IEmployee[]>;
  updateEmployee: (id: string, employee: IEmployee) => Promise<{ message: string }>;
  deleteEmployee: (id: string) => Promise<{ message: string }>;
  sendingImage: (formData: FormData) => Promise<string>;
}

export const EmployeeContext = createContext({} as IEmployeeContext);

const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const registerEmployee = async (employee: IEmployee) => {
    const authToken = localStorage.getItem('token');
    const response = await api.post(ENDPOINTS.employee, employee, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data;
  };

  const findAllEmployees = async () => {
    const authToken = localStorage.getItem('token');
    const response = await api.get(ENDPOINTS.employee, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data;
  };

  const updateEmployee = async (id: string, employee: IEmployee) => {
    const authToken = localStorage.getItem('token');
    const response = await api.put(`${ENDPOINTS.employee}/${id}`, employee, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data;
  };

  const deleteEmployee = async (id: string) => {
    const authToken = localStorage.getItem('token');
    const response = await api.delete(`${ENDPOINTS.employee}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data;
  };

  const sendingImage = async (formData: FormData) => {
    const authToken = localStorage.getItem('token');
    const response = await api.post(ENDPOINTS.upload, formData, {
      headers: {
        Authorization: 'Bearer ' + authToken,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  return (
    <EmployeeContext.Provider
      value={{
        registerEmployee,
        findAllEmployees,
        updateEmployee,
        deleteEmployee,
        sendingImage,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
