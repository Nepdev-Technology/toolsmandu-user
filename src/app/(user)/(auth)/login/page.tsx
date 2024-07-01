'use client';
import { useLogin } from '@/src/hooks/auth/userLogin';
import { MESSAGE } from '@/src/types/enums/notification.enums';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/src/utils/notificationUtils';
import {
  Button,
  Divider,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FormValues {
  name: string;
  password: string;
}
export default function Login() {
  const form = useForm({
    initialValues: {
      name: '',
      password: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? "Username can't be empty" : null),
      password: (value) =>
        value.length < 2 ? "Password can't be empty" : null,
    },
  });
  const { login } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const [loading, setLoading] = useState(false);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    login(values.name, values.password)
      .then((user) => {
        setLoading(false);

        if (user.status === 401) {
          showErrorNotification(
            `${MESSAGE.LOGIN_FAILED}${'Verify email first'}`
          );
          router.push(`/verify?email=${form.values.name}&login=${true}`);
        } else if (user.status === 200) {
          showSuccessNotification(MESSAGE.LOGIN_SUCCESS);
          router.push(next ? next : '/');
          router.refresh();
        } else {
          showErrorNotification(user.message);
        }
      })
      .catch((e) => {
        showErrorNotification(
          `${MESSAGE.LOGIN_FAILED}${
            e.message || ' An unexpected error occurred.'
          }`
        );
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex gap-4 items-center justify-center">
        <Title order={2} className="text-textPrimary">
          Login
        </Title>
      </div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Email"
          placeholder="Email/Username"
          withAsterisk
          required
          size="md"
          {...form.getInputProps('name')}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          withAsterisk
          required
          size="md"
          {...form.getInputProps('password')}
        />
        <div className="flex justify-end">
          {' '}
          <Link href="/forgetPassword">
            {' '}
            <Button variant="transparent">Forgot your password?</Button>
          </Link>
        </div>

        <Button type="submit" className=" w-80  " loading={loading}>
          Login
        </Button>
      </form>
      <div className="flex justify-end items-center">
        <p> Don&apos;t have an account?</p>{' '}
        <Link href="/register">
          {' '}
          <Button variant="transparent">Sign Up</Button>
        </Link>
      </div>
      <Divider label="OR" labelPosition="center"></Divider>
    </>
  );
}
