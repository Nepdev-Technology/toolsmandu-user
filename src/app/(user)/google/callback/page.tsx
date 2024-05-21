'use client';
import Loading from '@/src/app/loading';
import SquareLoader from '@/src/components/Loading/SquareLoader';
import { useGoogleLogin } from '@/src/hooks/auth/userLogin';
import { Card, CardSection, Divider, Title } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const serachParams = useSearchParams();
  const refreshToken = serachParams.get('refreshToken');
  const jwtToken = serachParams.get('accessToken');
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
        status: 200,
        message: 'Success',
      };

      googleLogin(user)
        .then((res) => {
          if (res) {
            router.push('/');
          }
        })
        .catch((err) => {
          router.push('/login');
        });
    } else {
      router.push('/login');
    }
    //@ts-ignore
  };
  React.useEffect(() => {
    setToken();
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <Card shadow="lg" px={40} py={30} withBorder h={200}>
        <CardSection>
          <Title order={1} className="flex items-center gap-2">
            {<IconBrandGoogle></IconBrandGoogle>}Signing In Please Wait
          </Title>
        </CardSection>
        <Divider></Divider>
        <CardSection>
          <div className="flex justify-center mt-10">
            <Loading></Loading>{' '}
          </div>
        </CardSection>
      </Card>
    </div>
  );
};

export default Page;
