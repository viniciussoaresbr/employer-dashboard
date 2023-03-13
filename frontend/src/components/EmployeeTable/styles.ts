import { SystemStyleObject } from '@chakra-ui/react';

export const TableStyles: Record<string, SystemStyleObject> = {
  tableContainer: {
    width: '95%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    overflowX: 'scroll',
  },
  table: {
    width: '100%',
    bg: '#ffffff',
    fontFamily: 'Open Sans',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
    border: '10px solid white',
    marginLeft: {
      base: '0',
      '4xl': '0',
      '3xl': '2rem',
      '2xl': '7rem',
      xl: '11rem',
      lg: '29rem',
      md: '42rem',
      sm: '60rem',
      s: '68rem',
    },
  },
  avatar: {
    width: '4rem',
    height: '4rem',
    fontFamily: 'Open Sans',
    color: '#1479ff',
    bg: '#d5e6ff',
    ml: '0.3rem',
  },
  buttonNextPrev: {
    width: '6rem',
    height: '2rem',
    bg: '#193b68',
    borderRadius: '0.3rem',
    color: '#ffffff',
    boxShadow:
      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
    _hover: {
      bg: '#245494',
    },
    transition: 'ease 0.1s',
  },
  buttonPageNumber: {
    width: '2rem',
    height: '2rem',
    borderRadius: '0.3rem',
    color: '#ffffff',
    boxShadow:
      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
    _hover: {
      bg: '#245494',
    },
    transition: 'ease 0.1s',
  },
  tFoot: {
    position: 'relative',
  },
  paginationWrapper: {
    position: 'absolute',
    top: '55px',
    left: '0.2rem',
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

  loadingContainer: {
    width: '95%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
