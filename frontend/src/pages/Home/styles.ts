import { SystemStyleObject } from '@chakra-ui/react';

export const HomeStyles: Record<string, SystemStyleObject> = {
  homeContainer: {
    width: '100%',
    height: 'calc(100vh + 4rem)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeSection: {
    alignItems: 'center',
    justifyContent: {
      base: 'flex-end',
      sm: 'space-between',
    },
    width: '95%',
    height: '10%',
  },
  button: {
    width: {
      base: '20rem',
      sm: '18rem',
    },
    height: '2.5rem',
    borderRadius: '0.3rem',
    fontSize: '1.3rem',
    color: '#ffffff',
    boxShadow:
      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
    backgroundColor: '#193b68',
    _hover: { bg: '#245494' },
    transition: 'ease 0.1s',
  },
  homeTitle: {
    fontFamily: 'Montserrat',
    fontSize: '1.3rem',
    fontWeight: '500',
    color: '#1479ff',
    display: {
      base: 'none',
      sm: 'block',
    },
  },
};
