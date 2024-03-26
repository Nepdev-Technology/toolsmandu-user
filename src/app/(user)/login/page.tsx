'use client';
import { useLogin } from '@/src/hooks/auth/userLogin';
import { MESSAGE } from '@/src/types/enums/notification.enums';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/src/utils/notificationUtils';
import { PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter, useSearchParams } from 'next/navigation';

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

  const onSubmit = (values: FormValues) => {
    login(values.name, values.password)
      .then(() => {
        showSuccessNotification(MESSAGE.LOGIN_SUCCESS);
        router.push(next ? next : '/');
      })
      .catch((e) => {
        showErrorNotification(
          `${MESSAGE.LOGIN_FAILED}${
            e.message || ' An unexpected error occurred.'
          }`
        );
      });
  };

  return (
    <div className="w-screen mt-20 flex items-center justify-center text-textSecondary">
      <div className="h-fit flex flex-col gap-2">
        <Title order={2} className="text-textSecondary">
          Login
        </Title>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Username or Email"
            placeholder="johndoe@gmail.com"
            withAsterisk
            required
            {...form.getInputProps('name')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            withAsterisk
            required
            {...form.getInputProps('password')}
          />
          <button
            type="submit"
            className="h-10 w-80 mt-8 bg-black rounded text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
