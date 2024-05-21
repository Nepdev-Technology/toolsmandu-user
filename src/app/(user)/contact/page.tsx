'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { showNotificationOnRes } from '@/src/utils/notificationUtils';
import {
  Button,
  Card,
  CardSection,
  Modal,
  Select,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
//@ts-ignore
import ReCAPTCHA from 'react-google-recaptcha';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      captchaVerified: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name can not be empty' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (!value ? 'Phone can not be empty' : null),
      subject: (value) =>
        value.length < 2 ? 'Subject can not be empty' : null,
      message: (value) =>
        value.length < 2 ? 'Message can not be empty' : null,
      captchaVerified: (value) => (!value ? 'Captcha is required' : null),
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .push(`${apiRoutes.contactUs.base}`, values);
    if (response.success) {
      setToken(response?.data?.ticketId);
      form.reset();
    }
    showNotificationOnRes(response);
    setLoading(false);
  };
  async function onChange(value: any) {
    form.setFieldValue('captchaVerified', value);
  }
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
          <div className="flex gap-4 items-center justify-center">
            <Title order={2}>Contact Us / Request a service</Title>
          </div>
          <p className="text-center">
            Please fill below form to get in touch with us. We will reply in few
            hours.{' '}
          </p>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Name"
              placeholder="Enter your name"
              withAsterisk
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              variant="unstyled"
              type="email"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Email"
              placeholder="Enter your email"
              withAsterisk
              required
              {...form.getInputProps('email')}
            />
            <TextInput
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Phone "
              type="number"
              placeholder="Enter your phone"
              withAsterisk
              required
              {...form.getInputProps('phone')}
            />
            <TextInput
              variant="unstyled"
              type="email"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Subject"
              placeholder="Enter your subject"
              withAsterisk
              required
              {...form.getInputProps('subject')}
            />
            <Textarea
              autosize
              minRows={4}
              variant="unstyled"
              classNames={{
                input: 'bg-quaternary text-white px-2',
              }}
              style={{
                width: '100%',
              }}
              label="Message"
              placeholder="Enter your message"
              withAsterisk
              required
              {...form.getInputProps('message')}
            />
            <div></div>
            <div className="mt-4 ">
              <ReCAPTCHA
                sitekey="6LdAFOQpAAAAACnEX65cEvsBTuyWprFw9Hcc1pqZ"
                onChange={onChange}
              />{' '}
              <p className="text-red-500 text-end mt-2">
                {' '}
                {form.errors.captchaVerified}
              </p>
            </div>
            <Button loading={loading} type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </CardSection>
      </Card>
      <Modal
        opened={token ? true : false}
        onClose={() => setToken('')}
        title="Success"
      >
        <div className="bg-gray-100 ">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Ticket Submitted!
              </h3>
              <p className="text-gray-600 my-2">Your ticket id is: {token}</p>
              <p>
                {' '}
                Our Support team will be in touch with you via email. Keep
                checking inbox.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
