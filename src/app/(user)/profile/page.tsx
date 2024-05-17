'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Button,
  Card,
  CardSection,
  NumberInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone_no: '',
      userName: '',
      email: '',
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "Firstname can't be empty" : null,
      lastName: (value) =>
        value.length < 2 ? "Lastname can't be empty" : null,
      userName: (value) =>
        value.length < 2 ? "Username can't be empty" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone_no: (value) =>
        value.length < 2 ? "Phone no can't be empty" : null,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .update(`${apiRoutes.auth.profileUpdate}`, values);

    showNotificationOnRes(response);
    setLoading(false);
  };
  const getProfile = async () => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(`${apiRoutes.auth.getProfile}`, {
        next: {
          cache: 'no-store',
        },
      });

    form.setFieldValue('firstName', response.data.firstName);
    form.setFieldValue('lastName', response.data.lastName);
    form.setFieldValue('phoneNumber', response.data.phoneNumber);
    form.setFieldValue('userName', response.data.userName);
    form.setFieldValue('email', response.data.email);
    form.setFieldValue('phone_no', response.data.phone_no);
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);
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
            <Title order={2}>Profile</Title>
          </div>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="First Name"
              placeholder="John"
              withAsterisk
              required
              {...form.getInputProps('firstName')}
            />
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Last Name"
              placeholder="Doe"
              withAsterisk
              required
              {...form.getInputProps('lastName')}
            />
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Username "
              placeholder="johndoe"
              withAsterisk
              required
              {...form.getInputProps('userName')}
            />
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Email "
              type="email"
              placeholder="johndoe@gmail.com"
              withAsterisk
              required
              {...form.getInputProps('email')}
            />
            <NumberInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Phone "
              placeholder="987654321"
              withAsterisk
              required
              {...form.getInputProps('phone_no')}
            />
            <Button loading={loading} type="submit" className="mt-4">
              Save
            </Button>
          </form>
        </CardSection>
      </Card>
    </div>
  );
};

export default Page;
