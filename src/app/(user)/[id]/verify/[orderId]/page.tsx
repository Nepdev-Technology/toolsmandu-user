import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Button, Card, CardSection, Divider, Title } from '@mantine/core';
import Link from 'next/link';

const getOrdersData = async (id: string) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .get(`${apiRoutes.orders.base}/${id}`, {
      next: {
        cache: 'no-store',
      },
    });
  const data = response.data;
  return data;
};
const verifyOrder = async (id: string, data: string) => {
  const http = new HttpService();
  const response: any = await http
    .service()
    .get(`${apiRoutes.payement.esewa}/${data}/${id}`, {
      next: {
        cache: 'no-store',
      },
    });
  console.log(response, 'at res component');
  return response.data;
};
const page = async ({
  params,
  searchParams,
}: {
  params: { id: string; orderId: string };
  searchParams: { data: string };
}) => {
  const response = await verifyOrder(params.orderId, searchParams.data);
  console.log(response, 'at server res');
  // const productData: Product = await getOrdersData(params.orderId);
  return (
    <div className="flex justify-center items-center mt-10">
      <Card shadow="lg" px={40} py={30} withBorder>
        <CardSection>
          <Title order={1}>Payment Status</Title>
        </CardSection>
        <Divider></Divider>
        <CardSection>
          {/* {response.success ? (
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
          )} */}
        </CardSection>
        <div className="flex justify-center gap-3 mt-4">
          <Link href={`/${params.id}`}>
            {' '}
            <Button>Go back</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
