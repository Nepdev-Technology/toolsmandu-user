'use client';
import { Box, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import ProductCard from '../../Cards/ProductCard';
import ProductCategoryHeader from '../../heading/ProductCategoryHeader';

const ProductScrollArea = () => {
  const [categoryTitle, setCategoryTitle] = useState([]);
  return (
    <div className="mx-10">
      <ProductCategoryHeader title="Category 1"></ProductCategoryHeader>
      <ScrollArea scrollbars="x" type="never">
        <Box className="flex gap-3 overflow-hidden ">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
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
