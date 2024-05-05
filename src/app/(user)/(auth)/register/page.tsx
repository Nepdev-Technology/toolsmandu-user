'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  NumberInput,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone_no: null,
      userName: '',
      email: '',
      checkbox: false,
      password: '',
      confirmPassword: '',
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "Firstname can't be empty" : null,
      lastName: (value) =>
        value.length < 2 ? "Lastname can't be empty" : null,
      userName: (value) =>
        value.length < 2 ? "Username can't be empty" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone_no: (value) => (!value ? "Phone no can't be empty" : null),
      checkbox: (value) =>
        !value ? 'You must agree to the terms and conditions' : null,
      password: (value) =>
        value.length < 2 ? "Password can't be empty" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    const { checkbox, confirmPassword, ...others } = values;
    const response: any = await http
      .service()
      .push(`${apiRoutes.auth.register}`, others);

    if (response.success) {
      router.push(`/verify?email=${form.values.email}`);
    }
    showNotificationOnRes(response);
    setLoading(false);
  };

  return (
    <>
      <Title order={2} className="text-textPrimary">
        Register
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="First Name"
            placeholder="John"
            withAsterisk
            required
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            withAsterisk
            required
            {...form.getInputProps('lastName')}
          />
        </div>
        <TextInput
          label="Username "
          placeholder="johndoe"
          withAsterisk
          required
          {...form.getInputProps('userName')}
        />
        <TextInput
          label="Email "
          type="email"
          placeholder="johndoe@gmail.com"
          withAsterisk
          required
          {...form.getInputProps('email')}
        />
        <NumberInput
          label="Phone "
          placeholder="987654321"
          withAsterisk
          required
          {...form.getInputProps('phone_no')}
        />
        <div className="grid grid-cols-2 gap-2">
          <PasswordInput
            leftSection={<IconLock></IconLock>}
            label="Password"
            placeholder="new password"
            withAsterisk
            required
            {...form.getInputProps('password')}
          />
          <PasswordInput
            leftSection={<IconLock></IconLock>}
            label="Confirm Password"
            placeholder="confirm password"
            withAsterisk
            required
            {...form.getInputProps('confirmPassword')}
          />
        </div>

        <Checkbox
          className="my-3"
          label={
            <>
              I accept&nbsp;
              <Anchor size="sm" href="/" target="_blank">
                terms and conditions
              </Anchor>
            </>
          }
          {...form.getInputProps('checkbox', { type: 'checkbox' })}
          required
        />
        <Button type="submit" className=" w-full mt-4 " loading={loading}>
          Register
        </Button>
      </form>

      <div className="flex justify-end items-center">
        <p> Already have an account?</p>{' '}
        <Link href="/login">
          {' '}
          <Button variant="transparent">Login</Button>
        </Link>
      </div>
      <Divider label="OR" labelPosition="center"></Divider>
    </>
  );
};

export default Page;
