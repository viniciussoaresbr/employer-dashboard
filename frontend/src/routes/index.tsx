import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import AuthProvider from '../contexts/Auth';
import EmployeeProvider from '../contexts/Employee';
import UserProvider from '../contexts/User';
import { Home } from '../pages/Home';
import { RegisterEmployee } from '../pages/RegisterEmployee';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ROUTES } from './routes';

const ProtectedRoutes = () => {
  const authToken = localStorage.getItem('token');

  return authToken ? <Outlet /> : <Navigate to={ROUTES.login} />;
};

const UnprotectedRoutes = () => {
  const authToken = localStorage.getItem('token');

  return authToken ? <Navigate to={ROUTES.home} /> : <Outlet />;
};

interface IRoutes {
  path: string;
  element: JSX.Element;
}

const Router = () => {
  const unauthorizedRoutes: IRoutes[] = [
    {
      path: ROUTES.login,
      element: <SignIn />,
    },
    {
      path: ROUTES.signUp,
      element: <SignUp />,
    },
  ];

  const authorizedRoutes: IRoutes[] = [
    {
      path: ROUTES.home,
      element: <Home />,
    },
    {
      path: ROUTES.registerEmployee,
      element: <RegisterEmployee />,
    },
  ];

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <EmployeeProvider>
            <Header headerTitle="Employer Dashboard" />
            <Routes>
              {unauthorizedRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<UnprotectedRoutes />}
                >
                  <Route {...route} />
                </Route>
              ))}
              {authorizedRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<ProtectedRoutes />}
                >
                  <Route {...route} />
                </Route>
              ))}
              <Route path="*" element={<Navigate to={ROUTES.home} />} />
            </Routes>
            <Footer />
          </EmployeeProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
