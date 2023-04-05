import React, { useState, useContext } from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  Tfoot,
  HStack,
  Button,
  Flex,
  Heading,
  Spinner,
  Box,
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
  const itemsPerPage = 5;
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
          speed="0.4s"
          emptyColor="gray.200"
          color="#1479ff"
          size="xl"
        />
      </Flex>
    );
  }

  if (!EmployeesQuery?.data?.length) {
    return (
      <Flex sx={TableStyles.employeesEmpty}>
        <Heading fontFamily="Open Sans">Nenhum funcionário cadastrado</Heading>
      </Flex>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = EmployeesQuery.data.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(EmployeesQuery.data.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const calcRowHeightSize =
    currentItems.length < 5 ? `calc(20% * ${currentItems?.length})` : '90%';

  const formattedData = currentItems.map(item => {
    const date = new Date(item.date);
    return {
      ...item,
      date: format(date, 'dd/MM/yyyy'),
    };
  });

  return (
    <Box sx={TableStyles.tableContainer}>
      <Table
        sx={TableStyles.table}
        variant="striped"
        height={calcRowHeightSize}
      >
        <Thead h="2.5rem">
          <Tr>
            {columnsTable.map(label => {
              return <Th key={label}>{employeeDataTranslated[label]}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {formattedData.map((item, index) => {
            return (
              <Tr key={index}>
                <Td>
                  <Avatar
                    src={`${process.env.REACT_APP_API_BASE_URL}/download/${item.avatar}`}
                    name={item.name}
                    sx={TableStyles.avatar}
                    borderRadius="50%"
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.cpf}</Td>
                <Td>{item.email}</Td>
                <Td>{item.date}</Td>
                <Td>{item.status}</Td>
                <Td>{item.cep}</Td>
                <Td>{item.state}</Td>
                <Td>{item.city}</Td>
                <Td>{item.street}</Td>
                <Td>{item.district}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>
              <HStack sx={TableStyles.paginationContainer}>
                <Button
                  sx={TableStyles.buttonNextPrev}
                  isDisabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeftIcon sx={TableStyles.IconNextPrev} />
                </Button>
                {pageNumbers.map(pageNumber => (
                  <Button
                    sx={TableStyles.buttonPagination}
                    key={pageNumber}
                    bg={currentPage === pageNumber ? '#011627' : '#193b68'}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button
                  sx={TableStyles.buttonNextPrev}
                  isDisabled={
                    currentPage ===
                    Math.ceil(EmployeesQuery.data.length / itemsPerPage)
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRightIcon sx={TableStyles.IconNextPrev} />
                </Button>
              </HStack>
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
