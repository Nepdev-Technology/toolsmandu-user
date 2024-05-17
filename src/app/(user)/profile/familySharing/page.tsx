'use client';
import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { daysRemaining, normalizeDate } from '@/src/utils/normalizeDate';
import { Card, CardSection, Title } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../loading';

const Page = () => {
  const [tableData, setTableData] = useState([]);
  const searchParams = useSearchParams();
  const page = searchParams.get('search');
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);

  const getTableData = async () => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(
        `${apiRoutes.familySharing.user}?page=${page ? +page : 1}&limit=10`,
        {
          next: {
            cache: 'no-store',
          },
        }
      );

    const transformedData = response?.data?.result?.map((item: any) => {
      return {
        productName: item?.familySharingId?.product?.name,
        id: item.id,
        key: item.id,
        date: normalizeDate(item.createdAt),
        username: item?.username,
        password: item?.password,
        expiresIn: normalizeDate(item?.credentialUserIds?.[0]?.expiresIn),
        remainingDays: daysRemaining(item?.credentialUserIds?.[0]?.expiresIn),
      };
    });

    setTotal(response?.data?.totalCount);

    setTableData(transformedData);
    setLoading(false);
  };

  const columns = [
    { key: 'id', displayName: 'Order Id' },
    { key: 'productName', displayName: 'Product Name' },
    { key: 'date', displayName: 'Date' },
    { key: 'username', displayName: 'Username' },
    { key: 'password', displayName: 'Password' },
    { key: 'expiresIn', displayName: 'Expires In ' },
    { key: 'remainingDays', displayName: 'Remaining Days' },
  ];

  useEffect(() => {
    getTableData();
  }, []);
  return (
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
        <div className="flex gap-4 items-center">
          <Title order={2}>Family Sharing</Title>
        </div>
        <Suspense fallback={<Loading></Loading>}>
          <CustomTable columns={columns} elements={tableData}></CustomTable>
        </Suspense>
        <CustomPagination totalPages={total} />
      </CardSection>
    </Card>
  );
};

export default Page;
