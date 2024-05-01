'use client';
import { useGoogleLogin } from '@/src/hooks/auth/userLogin';
import { Card, CardSection, Divider, Loader, Title } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const serachParams = useSearchParams();
  const refreshToken = serachParams.get('refreshToken');
  const jwtToken = serachParams.get('refreshToken');
  const { googleLogin } = useGoogleLogin();
  const router = useRouter();
  const setToken = () => {
    if (jwtToken && refreshToken) {
      const [header, payload, signature] = jwtToken.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const id = decodedPayload.sub;
      const roles = decodedPayload.roles;
      const expiredAt = decodedPayload.exp;

      const user = {
        id,
        roles,
        expiredAt,
        accessToken: jwtToken,
        refreshToken,
      };
      googleLogin(user).then((res) => {
        if (res) {
          router.push('/');
        }
      });
    }
    //@ts-ignore
  };
  React.useEffect(() => {
    setToken();
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <Card shadow="lg" px={40} py={30} withBorder>
        <CardSection>
          <Title order={1}>Signing In</Title>
        </CardSection>
        <Divider></Divider>
        <Loader color="blue" type="bars" size="xl" />
      </Card>
    </div>
  );
};

export default Page;
