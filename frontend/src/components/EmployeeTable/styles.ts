import { SystemStyleObject } from '@chakra-ui/react';

export const TableStyles: Record<string, SystemStyleObject> = {
  tableContainer: {
    width: '95%',
    whiteSpace: 'nowrap',
    overflow: 'auto hidden',
    bg: 'white',
    borderRadius: 'lg',
    boxShadow: 'sm',
    border: '1px solid',
    borderColor: 'gray.200',
  },
  table: {
    width: '100%',
    bg: '#ffffff',
    fontFamily: 'Open Sans',
  },
  thead: {
    bg: 'gray.50',
    th: {
      color: 'gray.600',
      textTransform: 'none',
      fontSize: '0.85rem',
      fontWeight: '600',
      py: '1rem',
    },
  },
  tbody: {
    tr: {
      _hover: { bg: 'gray.50' },
      transition: 'background 0.2s',
    },
    td: {
      py: '0.8rem',
      color: 'gray.700',
    },
  },
  avatar: {
    width: '2.5rem',
    height: '2.5rem',
  },
  buttonNextPrev: {
    px: '1rem',
    height: '2rem',
    bg: 'white',
    border: '1px solid',
    borderColor: 'gray.200',
    borderRadius: 'md',
    color: 'gray.600',
    _hover: {
      bg: 'gray.50',
      borderColor: 'gray.300',
    },
    transition: 'all 0.2s',
  },
  IconNextPrev: {
    width: '20px',
    height: '20px',
  },
  buttonPagination: {
    minW: '2rem',
    height: '2rem',
    px: '0.5rem',
    borderRadius: 'md',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  employeesEmpty: {
    width: '95%',
    py: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
    bg: '#ffffff',
    borderRadius: 'lg',
    boxShadow: 'sm',
    border: '1px solid',
    borderColor: 'gray.200',
  },
  paginationContainer: {
    py: '1rem',
    justifyContent: 'center',
    width: '100%',
  },
  loadingContainer: {
    width: '95%',
    py: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
