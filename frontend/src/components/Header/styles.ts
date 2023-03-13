import { SystemStyleObject } from '@chakra-ui/react';

export const HeaderStyles: Record<string, SystemStyleObject> = {
  header: {
    width: '100%',
    height: '4rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#193b68',
  },
  titleWrapper: {
    height: '100%',
    alignItems: 'center',
    gap: '10px',
    ml: '1rem',
    cursor: 'pointer',
  },
  title: {
    display: {
      base: 'none',
      md: 'block',
    },
    fontFamily: 'open Sans',
    fontWeight: '300',
    fontSize: '1.6rem',
    color: '#ffffff',
  },
};
