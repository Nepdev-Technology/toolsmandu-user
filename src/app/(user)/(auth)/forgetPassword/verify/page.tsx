'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Button,
  Divider,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FormValues {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function Login() {
  const router = useRouter();
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (value.length < 2 ? "Email can't be empty" : null),
      otp: (value) => (value.length < 2 ? "Otp can't be empty" : null),
      password: (value) =>
        value.length < 2 ? "Password can't be empty" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const login = searchParams.get('login');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const http = new HttpService();

  const startTimer = () => {
    setResendTimer(5); // Set timer to 60 seconds
  };

  useEffect(() => {
    // eslint-disable-next-line
    let timerInterval: NodeJS.Timeout;

    if (resendTimer > 0) {
      timerInterval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [resendTimer]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const response: any = await http
      .service()
      .push(apiRoutes.auth.resetPasswordOtp, {
        email: values.email,
        otp: values.otp,
        password: values.password,
      });
    showNotificationOnRes(response);
    if (response.success) {
      router.push('/login');
    }
    setLoading(false);
  };

  const sendOtp = async () => {
    // Implement your OTP sending logic here
    setLoading(true);
    const response: any = await http.get(
      `${apiRoutes.auth.resetPasswordOtp}?email=${form.values.email}`
    );
    showNotificationOnRes(response);
    if (response.success) {
      setLoading(false);
      startTimer();
    }
  };

  useEffect(() => {
    if (email) {
      form.setFieldValue('email', email);
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (login) {
      sendOtp();
    } else {
      startTimer();
    }
  }, [login]);

  return (
    <>
      <Title order={2} className="text-textPrimary">
        Reset Password
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Otp"
          placeholder="One time password"
          withAsterisk
          required
          type="text"
          {...form.getInputProps('otp')}
        />
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
        <div className="flex justify-end items-center">
          {resendTimer === 0 ? (
            <Button variant="transparent" onClick={sendOtp}>
              Resend Otp
            </Button>
          ) : (
            <p className="mt-2">Resend OTP in {resendTimer} seconds</p>
          )}
        </div>
        <Button type="submit" className="w-80 mt-4" loading={loading}>
          Verify
        </Button>
      </form>
      <div className="flex justify-end items-center">
        <p>Remember your password?</p>{' '}
        <Link href="/login">
          {' '}
          <Button variant="transparent">Login</Button>
        </Link>
      </div>
      <Divider label="OR" labelPosition="center"></Divider>
    </>
  );
}
