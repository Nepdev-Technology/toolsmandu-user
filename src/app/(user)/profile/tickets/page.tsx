'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Button,
  Card,
  CardSection,
  Modal,
  Select,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const form = useForm({
    initialValues: {
      description: '',
      subject: '',
      type: '',
      orderId: '',
    },
    validate: {
      description: (value) =>
        value.length < 10 ? 'Description must be at least 20 characters' : null,
      subject: (value) =>
        value.length < 2 ? 'Subject can not be empty' : null,
      type: (value) => (value.length < 2 ? 'Type can not be empty' : null),
      orderId: (value) =>
        value.length < 1 ? 'Order Id can not be empty' : null,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .push(`${apiRoutes.ticket.base}`, values);
    if (response.success) {
      setToken(response?.data?.ticketId);
      form.reset();
    }
    showNotificationOnRes(response);
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
          <div className="flex gap-4 items-center">
            <Title order={2}>Raise a ticket</Title>
          </div>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <Select
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              data={['Billing/Sales Related', 'Technical Problem', 'Others']}
              label="Category"
              placeholder="Choose a category.."
              withAsterisk
              required
              size="md"
              {...form.getInputProps('type')}
            />
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Issue Title"
              placeholder="Enter the title"
              withAsterisk
              required
              size="md"
              {...form.getInputProps('subject')}
            />
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Order Id"
              placeholder="Enter the orderId"
              withAsterisk
              required
              {...form.getInputProps('orderId')}
            />
            <Textarea
              autosize
              minRows={10}
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Summary"
              placeholder="Describe your issue"
              withAsterisk
              required
              size="md"
              {...form.getInputProps('description')}
            />
            <Button loading={loading} type="submit" className="mt-4">
              Submit
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
                Ticket Submitted!
              </h3>
              <p className="text-gray-600 my-2">Your ticket id is: {token}</p>
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
