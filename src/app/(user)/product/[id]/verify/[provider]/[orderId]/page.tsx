import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { PAYMENT_GATEWAYS } from '@/src/utils/Payment/Payment';
import { Button, Card, CardSection, Divider, Title } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

const verifyEsewaPayment = async (id: string, data: string) => {
  try {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(`${apiRoutes.payement.esewa}?data=${data}&orderId=${id}`, {
        next: {
          cache: 'no-store',
        },
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const verifyKhaltiPayment = async (id: string, pdix: string) => {
  try {
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(`${apiRoutes.payement.khalti}?token=${pdix}&order_id=${id}`, {
        next: {
          cache: 'no-store',
        },
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const page = async ({
  params,
  searchParams,
}: {
  params: { id: string; orderId: string; provider: string };
  searchParams: {
    pidx: string;
    data: string;
    transaction_id: string;
    tidx: string;
    amount: string;
    total_amount: string;
    mobile: string;
  };
}) => {
  const { pidx, data, transaction_id, tidx, amount, total_amount, mobile } =
    searchParams;
  let response;
  if (params.provider === PAYMENT_GATEWAYS.ESEWA) {
    response = await verifyEsewaPayment(params.orderId, data);
  } else if (params.provider === PAYMENT_GATEWAYS.KHALTI) {
    response = await verifyKhaltiPayment(params.orderId, pidx);
  }

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
        <p className="text-gray-600 my-2">
          Thank you for completing your secure online payment.
        </p>
        <p> Have a great day! </p>
        <div className="flex justify-center gap-3 mt-4">
          <Link href={`/product/${params.id}`}>
            {' '}
            <Button>Go back</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
