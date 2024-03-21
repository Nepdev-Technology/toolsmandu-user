'use client';
import { Box, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import ProductCategoryHeader from '../../heading/ProductCategoryHeader';

const ProductScrollAreaClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoryTitle, setCategoryTitle] = useState([]);
  return (
    <div className="mx-10">
*      <ScrollArea scrollbars="x" type="never">
        <Box className="flex gap-3 overflow-hidden ">{children}</Box>
      </ScrollArea>
    </div>
  );
};

export default ProductScrollAreaClient;
