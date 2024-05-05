'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Button,
  Card,
  CardSection,
  Divider,
  Modal,
  NumberInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
interface ExternalUser {
  userId: string;
  createdAt: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface Ticket {
  id: number;
  createdAt: string;
  subject: string;
  type: string;
  status: string;
  description: string;
  reply: string | null;
  ticketId: string;

  externalUser: ExternalUser;
}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<Ticket>();
  const form = useForm({
    initialValues: {
      ticketId: null,
    },
    validate: {
      ticketId: (value) => (!value ? 'Ticket number cannot be empty' : null),
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(`${apiRoutes.ticket.user}/${values.ticketId}`, values);
    if (response.success) {
      setTicketData(response?.data);
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
            <Title order={2}>Track Your Support Case</Title>
          </div>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <NumberInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Ticket ID"
              placeholder="Enter Your Ticket ID:"
              withAsterisk
              required
              {...form.getInputProps('ticketId')}
            />
            <Button loading={loading} type="submit" className="mt-4">
              Get status
            </Button>
          </form>
        </CardSection>
      </Card>
      <Modal
        opened={ticketData ? true : false}
        onClose={() => setTicketData(undefined)}
        title="Ticket Details        "
      >
        <div className="bg-gray-100 ">
          <div className="bg-white p-6  md:mx-auto">
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Status: {ticketData?.status.toUpperCase()}
              </h3>
              <p className="text-gray-600 my-2">
                Your ticket ID is: {ticketData?.id}
              </p>
              <Divider></Divider>
              <h3>Reply</h3>
              <p>
                {ticketData?.reply
                  ? ticketData.reply
                  : "Admin hasn't replied to you yet"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
