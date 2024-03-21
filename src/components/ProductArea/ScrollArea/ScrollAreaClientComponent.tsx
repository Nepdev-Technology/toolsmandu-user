'use client';
import { Box, ScrollArea } from '@mantine/core';
import { useState } from 'react';

const ProductScrollAreaClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoryTitle, setCategoryTitle] = useState([]);
  return (
    <div>
      *{' '}
      <ScrollArea scrollbars="x" type="never">
        <Box className="flex gap-3 overflow-hidden ">{children}</Box>
      </ScrollArea>
    </div>
  );
};

export default ProductScrollAreaClient;
