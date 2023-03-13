import React, { useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { HeaderStyles } from './styles';
import { EnterpriseIcon } from '../../assets/EnterpriseIcon';
import { LogoutIcon } from '../../assets/LogoutIcon';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { AuthContext } from '../../contexts/Auth';
import { UserContext } from '../../contexts/User';
import { useQuery } from '@tanstack/react-query';
import { IUserById } from '../../types/user';
import { UserProfile } from '../UserProfile';

interface IHeader {
  headerTitle: string;
}

export const Header = ({ headerTitle }: IHeader) => {
  const { handleLogout } = useContext(AuthContext);
  const { getUserById } = useContext(UserContext);
  const navigate = useNavigate();

  const authToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const redirectToPage = () => (authToken ? ROUTES.home : ROUTES.login);

  const { data } = useQuery<IUserById, Error>({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  });

  const fullName = `${data?.name} ${data?.lastname}`;

  const userMenuOptions = [
    {
      label: 'Logout',
      icon: <LogoutIcon />,
      onClick: () => {
        handleLogout();
        navigate(ROUTES.login);
      },
    },
  ];

  const employeesMenuOptions = [
    {
      label: 'Visualizar',
      onClick: () => navigate(ROUTES.home),
    },
    {
      label: 'Cadastrar',
      onClick: () => navigate(ROUTES.registerEmployee),
    },
  ];

  return (
    <Flex as="header" sx={HeaderStyles.header}>
      <Flex
        as="section"
        sx={HeaderStyles.titleWrapper}
        onClick={() => navigate(redirectToPage())}
      >
        <Heading as="h1" sx={HeaderStyles.title}>
          {headerTitle}
        </Heading>
        <EnterpriseIcon cursor="pointer" />
      </Flex>
      {authToken && (
        <UserProfile
          username={fullName}
          userMenuOptions={userMenuOptions}
          employeesMenuOptions={employeesMenuOptions}
        />
      )}
    </Flex>
  );
};
