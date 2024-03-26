import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Product } from '@/src/types/interfaces/ProductInterface';
import { Button, Card, CardSection, Divider, Title } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';

const getTableData = async (id: string) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .get(`${apiRoutes.products.base}/${id}`, {
      next: {
        cache: 'no-store',
      },
    });
  const data = response.data;
  return data;
};
const page = async ({
  params,
}: {
  params: { id: string; orderId: string };
}) => {
  const productData: Product = await getTableData(params.id);
  const success = true;
  return (
    <div className="flex justify-center items-center mt-10">
      <Card shadow="lg" px={40} py={30} withBorder>
        <CardSection>
          <Title order={1}>Payment Status</Title>
        </CardSection>
        <Divider></Divider>
        <CardSection>
          {success ? (
            <div className="flex flex-col items-center justify-center">
              {' '}
              <IconCheck size={200} color="green" />
              <Title order={2}>SUCCESS</Title>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <IconAlertCircle size={200} color="red" />
              <Title order={2}>FAILURE</Title>
            </div>
          )}
        </CardSection>
        <div className="flex justify-center gap-3 mt-4">
          <Button>Go back</Button>
        </div>
      </Card>
    </div>
  );
};

export default page;
