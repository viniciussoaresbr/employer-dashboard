import React from 'react';
import {
  Button,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EmployeeTable } from '../../components/EmployeeTable';
import { HomeStyles } from './styles';
import { EmployeeForm } from '../../components/EmployeeForm';
import { AddIcon } from '@chakra-ui/icons';

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex sx={HomeStyles.homeContainer}>
      <Flex as="section" sx={HomeStyles.homeSection}>
        <Heading as="h1" sx={HomeStyles.homeTitle}>
          Funcionários
        </Heading>
        <Button
          sx={HomeStyles.button}
          onClick={onOpen}
          leftIcon={<AddIcon />}
        >
          Cadastrar Funcionário
        </Button>
      </Flex>
      
      <EmployeeTable />

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="xl">
          <ModalHeader borderBottom="1px solid" borderColor="gray.100" py={4}>
            Cadastrar Novo Funcionário
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <EmployeeForm onSuccess={onClose} onCancel={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
