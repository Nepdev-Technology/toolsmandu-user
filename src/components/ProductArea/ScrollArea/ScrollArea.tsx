'use client';
import { Box, ScrollArea } from '@mantine/core';
import ProductCard from '../../Cards/ProductCard';
import UserCategoryHeader from '../../heading/UserCategoryHeader';

const ProductScrollArea = () => {
  return (
    <div className="mx-10">
      <UserCategoryHeader title="Category 1"></UserCategoryHeader>
      <ScrollArea scrollbars="x" type="never">
        <Box className="flex gap-3 overflow-hidden ">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </Box>
      </ScrollArea>
    </div>
  );
};

export default ProductScrollArea;
