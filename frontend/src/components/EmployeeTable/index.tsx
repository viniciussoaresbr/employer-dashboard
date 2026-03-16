import React, { useState, useContext } from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  HStack,
  Button,
  Flex,
  Heading,
  Spinner,
  Box,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { TableStyles } from './styles';
import { employeeDataTranslated } from '../../utils/translate';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { EmployeeContext } from '../../contexts/Employee';
import { IEmployee } from '../../types/employee';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { EmployeeForm } from '../EmployeeForm';

export const EmployeeTable = () => {
  const { findAllEmployees, deleteEmployee } = useContext(EmployeeContext);
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null,
  );

  const itemsPerPage = 10;
  const columnsTable = [
    'avatar',
    'name',
    'cpf',
    'email',
    'date',
    'status',
    'cep',
    'state',
    'city',
    'street',
    'district',
    'actions',
  ];

  const EmployeesQuery = useQuery<IEmployee[], Error>({
    queryKey: ['employee'],
    queryFn: findAllEmployees,
  });

  const deleteMutation = useMutation((id: string) => deleteEmployee(id), {
    onSuccess: data => {
      queryClient.invalidateQueries(['employee']);
      toast({
        title: data.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onDeleteClose();
    },
    onError: () => {
      toast({
        title: 'Erro ao excluir funcionário',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleEditClick = (employee: IEmployee) => {
    setSelectedEmployee(employee);
    onEditOpen();
  };

  const handleDeleteClick = (employee: IEmployee) => {
    setSelectedEmployee(employee);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    if (selectedEmployee?.id) {
      deleteMutation.mutate(selectedEmployee.id);
    }
  };

  if (EmployeesQuery.isLoading) {
    return (
      <Flex sx={TableStyles.loadingContainer}>
        <Spinner
          thickness="4px"
          speed="0.6s"
          emptyColor="gray.100"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (!EmployeesQuery?.data?.length) {
    return (
      <Flex sx={TableStyles.employeesEmpty}>
        <Heading fontSize="1.2rem" fontWeight="600" color="gray.600">
          Nenhum funcionário cadastrado
        </Heading>
      </Flex>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = EmployeesQuery.data.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(EmployeesQuery.data.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formattedData = currentItems.map(item => ({
    ...item,
    formattedDate: format(
      parseISO(String(item.date).slice(0, 10)),
      'dd/MM/yyyy',
    ),
  }));

  return (
    <Box sx={TableStyles.tableContainer}>
      <Table sx={TableStyles.table} variant="simple">
        <Thead sx={TableStyles.thead}>
          <Tr>
            {columnsTable.map(label => (
              <Th key={label}>
                {label === 'actions' ? 'Ações' : employeeDataTranslated[label]}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody sx={TableStyles.tbody}>
          {formattedData.map((item, index) => (
            <Tr
              key={index}
              cursor="pointer"
              onClick={() => handleEditClick(item)}
            >
              <Td onClick={e => e.stopPropagation()}>
                <Avatar
                  src={`${process.env.REACT_APP_API_BASE_URL}/download/${item.avatar}`}
                  name={item.name}
                  sx={TableStyles.avatar}
                />
              </Td>
              <Td fontWeight="500">{item.name}</Td>
              <Td>{item.cpf}</Td>
              <Td>{item.email}</Td>
              <Td>{item.formattedDate}</Td>
              <Td>
                <Badge
                  colorScheme={item.status === 'Ativo' ? 'green' : 'red'}
                  variant="subtle"
                  borderRadius="full"
                  px="2"
                  textTransform="none"
                  fontSize="0.75rem"
                >
                  {item.status}
                </Badge>
              </Td>
              <Td>{item.cep}</Td>
              <Td>{item.state}</Td>
              <Td>{item.city}</Td>
              <Td>{item.street}</Td>
              <Td>{item.district}</Td>
              <Td onClick={e => e.stopPropagation()}>
                <HStack spacing="2">
                  <IconButton
                    aria-label="Editar funcionário"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => handleEditClick(item)}
                  />
                  <IconButton
                    aria-label="Excluir funcionário"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDeleteClick(item)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex sx={TableStyles.paginationContainer}>
        <HStack spacing="2">
          <Button
            sx={TableStyles.buttonNextPrev}
            isDisabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            leftIcon={<ChevronLeftIcon />}
            variant="outline"
            size="sm"
          >
            Anterior
          </Button>

          <HStack spacing="1">
            {pageNumbers.map(pageNumber => (
              <Button
                key={pageNumber}
                sx={TableStyles.buttonPagination}
                colorScheme={currentPage === pageNumber ? 'blue' : 'gray'}
                variant={currentPage === pageNumber ? 'solid' : 'ghost'}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
          </HStack>

          <Button
            sx={TableStyles.buttonNextPrev}
            isDisabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            rightIcon={<ChevronRightIcon />}
            variant="outline"
            size="sm"
          >
            Próximo
          </Button>
        </HStack>
      </Flex>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={onEditClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader borderBottom="1px solid" borderColor="gray.100" py={4}>
            Editar Funcionário
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            {selectedEmployee && (
              <EmployeeForm
                initialData={selectedEmployee}
                onSuccess={onEditClose}
                onCancel={onEditClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Tem certeza que deseja excluir o funcionário{' '}
            <strong>{selectedEmployee?.name}</strong>? Esta ação não pode ser
            desfeita.
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={confirmDelete}
              isLoading={deleteMutation.isLoading}
            >
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
