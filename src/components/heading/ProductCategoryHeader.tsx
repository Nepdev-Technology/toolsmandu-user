import { Divider, Title } from '@mantine/core';

interface IProductCategoryHeader {
  title: string;
}
const ProductCategoryHeader = ({ title }: IProductCategoryHeader) => {
  return (
    <div>
      <Divider
        my="md"
        labelPosition="center"
        label={
          <div className="bg-primary px-2 py-1 rounded-md">
            <Title order={3} className="  text-textSecondary">
              {title}
            </Title>
          </div>
        }
      />
    </div>
  );
};

export default ProductCategoryHeader;