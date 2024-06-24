'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { Button, Divider, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginFormValues {
  email: string;
}
export default function Login() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http.get(
      `${apiRoutes.auth.resetPasswordOtp}?email=${values.email}`
    );
    showNotificationOnRes(response);
    if (response.success) {
      router.push(`/forgetPassword/verify?email=${values.email}`);
    }
    setLoading(false);
  };

  return (
    <>
      {' '}
      <div className="flex gap-4 items-center justify-center">
        <Title order={2} className="text-textPrimary">
          Forgot your password?
        </Title>
      </div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Email"
          placeholder="johndoe@gmail.com"
          type="email"
          withAsterisk
          required
          {...form.getInputProps('email')}
        />

        <Button type="submit" className=" w-80 mt-8 " loading={loading}>
          Send OTP
        </Button>
      </form>
      <div className="flex justify-end items-center">
        <p> Remember your password?</p>{' '}
        <Link href="/login">
          {' '}
          <Button variant="transparent">Login</Button>
        </Link>
      </div>
      <Divider label="OR" labelPosition="center"></Divider>
    </>
  );
}
