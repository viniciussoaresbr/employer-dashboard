import { SystemStyleObject } from '@chakra-ui/react';

export const ProfileStyles: Record<string, SystemStyleObject> = {
  profileContainer: {
    width: '14rem',
    height: '80%',
    alignItems: 'center',
    cursor: 'pointer',
    borderLeft: '1px solid #d5e6ff',
  },
  profileWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    gap: '10px',
  },
  username: {
    fontFamily: 'Open Sans',
    fontSize: '1.1rem',
    color: '#ffffff',
  },
  menuButton: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    fontFamily: 'Open Sans',
    width: '3rem',
    height: '3rem',
    bg: '#d5e6ff',
    color: '#1479ff',
    ml: '10px',
  },
};
