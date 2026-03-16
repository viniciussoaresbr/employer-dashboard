import { SystemStyleObject } from '@chakra-ui/react';

export const HomeStyles: Record<string, SystemStyleObject> = {
  homeContainer: {
    width: '100%',
    minHeight: 'calc(100vh - 4.5rem)',
    flexDirection: 'column',
    alignItems: 'center',
    bg: 'gray.50',
    py: '2rem',
  },
  homeSection: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    mb: '2rem',
  },
  button: {
    px: '1.5rem',
    height: '2.8rem',
    borderRadius: 'md',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: 'blue.500',
    _hover: { bg: 'blue.600', transform: 'translateY(-1px)' },
    _active: { bg: 'blue.700' },
    transition: 'all 0.2s',
    boxShadow: 'sm',
  },
  homeTitle: {
    fontFamily: 'Open Sans',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'blue.800',
  },
};
