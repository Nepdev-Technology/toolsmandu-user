import { Divider, Title } from '@mantine/core';

interface IProductCategoryHeader {
  title: string;
  id: string | number;
}
const ProductCategoryHeader = ({ title, id }: IProductCategoryHeader) => {
  return (
    <div>
      <Divider
        key={id}
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
