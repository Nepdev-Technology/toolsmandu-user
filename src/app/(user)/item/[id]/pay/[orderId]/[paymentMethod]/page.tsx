'use client';
import { showSuccessNotification } from '@/src/utils/notificationUtils';
import { PAYMENT_GATEWAYS } from '@/src/utils/Payment/Payment';
import {
  Button,
  Card,
  CardSection,
  Divider,
  Modal,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useClipboard } from '@mantine/hooks';
import {
  IconChecklist,
  IconClipboard,
  IconClipboardOff,
  IconCopy,
  IconCopyOff,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
//@ts-ignore

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalAmount = searchParams.get('totalAmount');
  const clipboard = useClipboard({ timeout: 500 });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      // name: (value) => (value.length < 2 ? 'Name can not be empty' : null),
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);

    showSuccessNotification('Order placed successfully');
    router.push(`/item/${params?.id}`);
    setLoading(false);
  };
  return (
    <div className=" text-textPrimary  xs:mx-4 sm:mx-16 md:mx-32">
      <Card
        shadow="sm"
        px={'lg'}
        py={'sm'}
        radius="md"
        className="bg-tertiary text-textPrimary"
      >
        <CardSection
          px={10}
          py={10}
          className="flex flex-col gap-3 justify-around"
        >
          <div className="flex gap-4 items-center justify-center">
            <Title order={2}>
              {params.paymentMethod === PAYMENT_GATEWAYS.ESEWA
                ? 'eSewa Payment'
                : 'QR Payment'}{' '}
            </Title>
          </div>
          <p className="text-center">
            {params.paymentMethod === PAYMENT_GATEWAYS.ESEWA
              ? 'You can pay via eSewa Fund Transfer.'
              : 'Pay via Esewa, Khalti, IMEPay, Mobile Banking etc.'}{' '}
          </p>
          <div className="flex justify-center items-center gap-6">
            <div>
              Total Amount
              <div>
                <span className="text-textSP">NPR.</span>{' '}
                <span className="text-2xl font-bold">{totalAmount}</span>
              </div>
            </div>
            <Divider orientation="vertical"></Divider>
            <div>
              Order Id
              <div className=" text-xl font-bold text-center">
                {params?.orderId}
              </div>
            </div>
          </div>
          <div className="bg-red-600 text-textPrimary text-center py-2 font-bold">
            Important: Please write Your Order ID in Payment Remarks
          </div>
          {params.paymentMethod === PAYMENT_GATEWAYS.ESEWA ? (
            <div className="grid grid-cols-1 grid-rows-2 text-center">
              <p className=" font-bold text-lg relative left-8">
                Our Esewa ID: <span>9864484274</span>{' '}
                <Button
                  // rightSection={<IconClipboard></IconClipboard>}
                  color={clipboard.copied ? 'gray' : 'white'}
                  onClick={() => clipboard.copy('9864484274')}
                  variant="transparent"
                >
                  {/* {clipboard.copied ? 'Copied' : 'Copy'} */}
                  {clipboard.copied ? (
                    <IconCopyOff></IconCopyOff>
                  ) : (
                    <IconCopy></IconCopy>
                  )}
                </Button>
              </p>
              <p className=" font-bold text-lg">
                Esewa Name: <span>Tools Mandu</span>
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Image
                src={'/qr-toolsmandu.jpg'}
                width={300}
                height={500}
                alt="Qr code for toolsmandu"
              ></Image>
            </div>
          )}

          <div className="  text-center py-2 font-bold">
            After you pay, click on &quot;Place Order&quot; below.{' '}
          </div>
          <form
            onSubmit={form.onSubmit(onSubmit)}
            className="flex justify-center"
          >
            <Button
              loading={loading}
              type="submit"
              className="my-4 bg-green-500"
            >
              Place Order
            </Button>
          </form>
        </CardSection>
      </Card>
      <Modal
        opened={token ? true : false}
        onClose={() => setToken('')}
        title="Success"
      >
        <div className="bg-gray-100 ">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Order Placed!
              </h3>
              <p className="text-gray-600 my-2">Your order id is: {token}</p>
              <p>
                {' '}
                Our Support team will be in touch with you via email. Keep
                checking inbox.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
