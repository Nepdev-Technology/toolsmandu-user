import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Button, Card, CardSection, Divider, Title } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

const verifyOrder = async (id: string, data: string) => {
  const http = new HttpService();
  console.log(
    `${apiRoutes.payement.esewa}?data=${data}&orderId=${id}`,
    'this is url to be requrested'
  );
  const response: any = await http
    .service()
    .get(`${apiRoutes.payement.esewa}?data=${data}&orderId=${id}`, {
      next: {
        cache: 'no-store',
      },
    });
  console.log(response, 'at res component');
  return response;
};
const page = async ({
  params,
  searchParams,
}: {
  params: { id: string; orderId: string };
  searchParams: { data: string };
}) => {
  const response = await verifyOrder(params.orderId, searchParams.data);

  return (
    <div className="flex justify-center items-center mt-10">
      <Card shadow="lg" px={40} py={30} withBorder>
        <CardSection>
          <Title order={1}>Payment Status</Title>
        </CardSection>
        <Divider></Divider>
        <CardSection>
          {response?.success ? (
            <div className="flex flex-col items-center justify-center">
              {' '}
              <IconCheck size={200} color="green" />
              <Title order={2}>{response.message}</Title>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <IconAlertCircle size={200} color="red" />
              <Title order={2}>{response.message}</Title>
            </div>
          )}
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
