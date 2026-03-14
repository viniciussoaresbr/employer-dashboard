import { SystemStyleObject } from '@chakra-ui/react';

export const ProfileStyles: Record<string, SystemStyleObject> = {
  profileContainer: {
    height: '100%',
    alignItems: 'center',
    cursor: 'pointer',
    px: '1rem',
    _hover: { bg: 'gray.50' },
    transition: 'background 0.2s',
  },
  profileWrapper: {
    alignItems: 'center',
    gap: '12px',
  },
  username: {
    fontFamily: 'Open Sans',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'gray.700',
    display: { base: 'none', lg: 'block' },
  },
  menuButton: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: '2.4rem',
    height: '2.4rem',
    bg: 'blue.500',
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
};
