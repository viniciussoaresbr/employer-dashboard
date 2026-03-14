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
  Text,
} from '@chakra-ui/react';
import { TableStyles } from './styles';
import { employeeDataTranslated } from '../../utils/translate';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { EmployeeContext } from '../../contexts/Employee';
import { IEmployee } from '../../types/employee';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export const EmployeeTable = () => {
  const { findAllEmployees } = useContext(EmployeeContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
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
  ];

  const EmployeesQuery = useQuery<IEmployee[], Error>({
    queryKey: ['employee'],
    queryFn: findAllEmployees,
  });

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

  const formattedData = currentItems.map(item => {
    const date = new Date(item.date);
    return {
      ...item,
      date: format(date, 'dd/MM/yyyy'),
    };
  });

  return (
    <Box sx={TableStyles.tableContainer}>
      <Table sx={TableStyles.table} variant="simple">
        <Thead sx={TableStyles.thead}>
          <Tr>
            {columnsTable.map(label => (
              <Th key={label}>{employeeDataTranslated[label]}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody sx={TableStyles.tbody}>
          {formattedData.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Avatar
                  src={`${process.env.REACT_APP_API_BASE_URL}/download/${item.avatar}`}
                  name={item.name}
                  sx={TableStyles.avatar}
                />
              </Td>
              <Td fontWeight="500">{item.name}</Td>
              <Td>{item.cpf}</Td>
              <Td>{item.email}</Td>
              <Td>{item.date}</Td>
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
    </Box>
  );
};
