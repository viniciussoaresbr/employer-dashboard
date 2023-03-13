import { Flex } from '@chakra-ui/react';
import React from 'react';
import { EmployeeForm } from '../../components/EmployeeForm';
import { RegisterEmployeeStyles } from './styles';

export const RegisterEmployee = () => {
  return (
    <Flex sx={RegisterEmployeeStyles.formContainer}>
      <EmployeeForm />
    </Flex>
  );
};
