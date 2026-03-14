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
import { ProfileSkeleton } from '../ProfileSkeleton';

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

  const { data, isSuccess } = useQuery<IUserById, Error>({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId && !!authToken,
  });

  const fullName = data ? `${data.name} ${data.lastname}` : '';

  const userMenuOptions = [
    {
      label: 'Meu Perfil',
      onClick: () => {
        console.log('Meu Perfil');
      },
    },
    {
      label: 'Configurações',
      onClick: () => {
        console.log('Configurações');
      },
    },
    {
      label: 'Sair',
      icon: <LogoutIcon />,
      onClick: () => {
        handleLogout();
        navigate(ROUTES.login);
      },
    },
  ];

  return (
    <Flex as="header" sx={HeaderStyles.header}>
      <Flex
        as="section"
        sx={HeaderStyles.titleWrapper}
        onClick={() => navigate(redirectToPage())}
      >
        <EnterpriseIcon fill="#2D3748" cursor="pointer" />
        <Heading as="h1" sx={HeaderStyles.title}>
          {headerTitle}
        </Heading>
      </Flex>
      {authToken && isSuccess ? (
        <UserProfile username={fullName} userMenuOptions={userMenuOptions} />
      ) : (
        authToken && <ProfileSkeleton />
      )}
    </Flex>
  );
};
