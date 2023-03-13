import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { EmployeeTable } from '../../components/EmployeeTable';
import { HomeStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Flex sx={HomeStyles.homeContainer}>
      <Flex as="section" sx={HomeStyles.homeSection}>
        <Heading as="h1" sx={HomeStyles.homeTitle}>
          Lista de Funcionários :
        </Heading>
        <Button
          sx={HomeStyles.button}
          onClick={() => navigate(ROUTES.registerEmployee)}
        >
          Cadastrar Funcionário
        </Button>
      </Flex>
      <EmployeeTable />
    </Flex>
  );
};
