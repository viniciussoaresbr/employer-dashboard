import { SystemStyleObject } from '@chakra-ui/react';

export const HeaderStyles: Record<string, SystemStyleObject> = {
  header: {
    width: '100%',
    height: '4.5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    boxShadow: 'sm',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
    px: '2rem',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  titleWrapper: {
    height: '100%',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    _hover: { opacity: 0.8 },
    transition: 'opacity 0.2s',
  },
  title: {
    display: {
      base: 'none',
      md: 'block',
    },
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '1.4rem',
    color: 'gray.800',
  },
};
