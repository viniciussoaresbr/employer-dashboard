import { SystemStyleObject } from '@chakra-ui/react';

export const ProfileSkeletonStyles: Record<string, SystemStyleObject> = {
  skeletonWrapper: {
    width: '14rem',
    height: '80%',
    gap: '10px',
    alignItems: 'center',
  },
  skeletonCircle: {
    ml: '10px',
  },
  skeleton: {
    width: '8rem',
    height: '1rem',
  },
};
