import { SystemStyleObject } from '@chakra-ui/react';

export const TableStyles: Record<string, SystemStyleObject> = {
  tableContainer: {
    width: '95%',
    height: '90%',
    whiteSpace: 'nowrap',
    overflow: 'auto hidden',
  },
  table: {
    width: '100%',
    bg: '#ffffff',
    fontFamily: 'Open Sans',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
    border: '10px solid white',
  },
  avatar: {
    width: '4rem',
    height: '4rem',
    fontFamily: 'Open Sans',
    color: '#1479ff',
    bg: '#d5e6ff',
  },
  buttonNextPrev: {
    width: '2rem',
    height: '2rem',
    bg: '#193b68',
    borderRadius: '0.3rem',
    color: '#ffffff',
    _hover: {
      bg: '#245494',
    },
    transition: 'ease 0.1s',
  },
  IconNextPrev: {
    width: '25px',
    height: '25px',
  },
  buttonPagination: {
    width: '2rem',
    height: '2rem',
    borderRadius: '0.3rem',
    color: '#ffffff',
    _hover: {
      bg: '#245494',
    },
    transition: 'ease 0.1s',
  },
  employeesEmpty: {
    width: '95%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    bg: '#ffffff',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
    border: '10px solid white',
  },
  paginationContainer: {
    height: '1rem',
  },
  loadingContainer: {
    width: '95%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
