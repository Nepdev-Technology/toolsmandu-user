'use client';
import { Button, Divider, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FormValues {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
export default function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) =>
        value.length < 2 ? "Password can't be empty" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const [loading, setLoading] = useState(false);

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    setLoading(false);
  };

  return (
    <>
      <Title order={2} className="text-textPrimary">
        Forget Password
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
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
        <Button type="submit" className=" w-80 mt-8 " loading={loading}>
          Reset
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
