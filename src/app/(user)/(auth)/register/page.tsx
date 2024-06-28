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
import { transform } from 'next/dist/build/swc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//@ts-ignore
import ReCAPTCHA from 'react-google-recaptcha';

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
      captchaVerified: '',
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
      captchaVerified: (value) => (!value ? 'Captcha is required' : null),
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    const { checkbox, confirmPassword, captchaVerified, ...others } = values;
    const response: any = await http
      .service()
      .push(`${apiRoutes.auth.register}/${captchaVerified}`, others);

    if (response.success) {
      router.push(`/verify?email=${form.values.email}`);
    }
    showNotificationOnRes(response);
    setLoading(false);
  };

  function onChange(value: any) {
    form.setFieldValue('captchaVerified', value);
  }

  return (
    <>
      <div className="flex gap-4 items-center justify-center">
        <Title order={2} className="text-textPrimary">
          Register
        </Title>
      </div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="First Name"
            placeholder="First Name"
            withAsterisk
            required
            size="md"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            withAsterisk
            required
            size="md"
            {...form.getInputProps('lastName')}
          />
        </div>
        <TextInput
          label="Username "
          placeholder="Username"
          withAsterisk
          required
          size="md"
          {...form.getInputProps('userName')}
        />
        <TextInput
          label="Email "
          type="email"
          placeholder="Enter your email address.."
          withAsterisk
          required
          size="md"
          {...form.getInputProps('email')}
        />
        <NumberInput
          label="Phone "
          placeholder="98XXXXXXXX"
          withAsterisk
          required
          hideControls
          size="md"
          {...form.getInputProps('phone_no')}
        />
        <div className="grid grid-cols-2 gap-2">
          <PasswordInput
            leftSection={<IconLock></IconLock>}
            label="Password"
            placeholder="Set your Password"
            withAsterisk
            required
            size="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            leftSection={<IconLock></IconLock>}
            label="Confirm Password"
            placeholder="Re-type your password"
            withAsterisk
            required
            size="md"
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

        <div className="flex ">
          <ReCAPTCHA
            style={{ transform: 'scale(1.16)', transformOrigin: '0 0' }}
            sitekey={`${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA}`}
            onChange={onChange}
          />
        </div>
        <p className="text-red-500 text-end mt-2">
          {' '}
          {form.errors.captchaVerified}
        </p>

        <Button type="submit" className=" w-full mt-4 " loading={loading}>
          Register
        </Button>
      </form>

      <div className="flex justify-end items-center">
        <p className="mt-1"> Already have an account?</p>{' '}
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
