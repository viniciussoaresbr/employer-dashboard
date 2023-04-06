import React from 'react';
import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { ProfileSkeletonStyles } from './styles';

export const ProfileSkeleton = () => (
  <Flex sx={ProfileSkeletonStyles.skeletonWrapper}>
    <SkeletonCircle
      size="50px"
      sx={ProfileSkeletonStyles.skeletonCircle}
      fadeDuration={0.5}
      speed={0.1}
    />
    <Skeleton
      sx={ProfileSkeletonStyles.skeleton}
      fadeDuration={0.5}
      speed={0.1}
    />
  </Flex>
);
