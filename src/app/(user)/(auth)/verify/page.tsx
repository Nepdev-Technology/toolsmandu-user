'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import { Button, Divider, em, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FormValues {
  email: string;
  otp: string;
}

export default function Login() {
  const router = useRouter();
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      otp: '',
    },
    validate: {
      email: (value) => (value.length < 2 ? "Username can't be empty" : null),
      otp: (value) => (value.length < 2 ? "Otp can't be empty" : null),
    },
  });
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const login = searchParams.get('login');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const http = new HttpService();

  const startTimer = () => {
    setResendTimer(60); // Set timer to 60 seconds
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
      .push(apiRoutes.auth.activateAccount, {
        email: values.email,
        otp: values.otp,
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
    const response: any = await http.service().push(apiRoutes.auth.resendOTP, {
      email: email,
    });
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
    if (login === 'true' && resendTimer === 0) {
      //login = true is true in login page only where auto send is required
      sendOtp();
    } else {
      startTimer();
    }
  }, [login]);

  return (
    <>
      <Title order={2} className="text-textPrimary">
        Verify
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Otp"
          placeholder="One time password"
          withAsterisk
          required
          {...form.getInputProps('otp')}
        />{' '}
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
        <p> Already verified?</p>{' '}
        <Link href="/login">
          {' '}
          <Button variant="transparent">Login</Button>
        </Link>
      </div>
      <Divider label="OR" labelPosition="center"></Divider>
    </>
  );
}
