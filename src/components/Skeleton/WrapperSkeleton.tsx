import { Skeleton, SkeletonProps } from '@mantine/core';
import React from 'react';

interface WrapperSkeletonProps extends SkeletonProps {
  // Add any additional props you want to support
}

const WrapperSkeleton: React.FC<WrapperSkeletonProps> = (props) => {
  return <Skeleton {...props} />;
};

export default WrapperSkeleton;
