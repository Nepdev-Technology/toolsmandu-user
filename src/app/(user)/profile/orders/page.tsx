'use client';
import { CustomPagination, CustomTable } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { normalizeDate } from '@/src/utils/normalizeDate';
import { Card, CardSection, ScrollArea, Title } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../../loading';

const Page = () => {
  const [tableData, setTableData] = useState([]);
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);

  const getTableData = async () => {
    setLoading(true);
    const http = new HttpService();
    const response: any = await http
      .service()
      .get(
        `${apiRoutes.orders.user}?page=${
          page ? +page : 1
        }&limit=10&sortBy=createdAt&sortOrder=desc`,
        {
          next: {
            cache: 'no-store',
          },
        }
      );
    const transformedData = response?.data?.result?.map((item: any) => {
      return {
        productName: `${item.product.name} - ${item.productVariation.name}`,
        id: item.id,
        key: item.id,
        date: normalizeDate(item.createdAt),
        amount: `Rs ${item.amount}`,
        paymentMethod: item?.payment?.method
          ? item?.payment?.method
          : item.paymentMethod === 'ADMIN'
            ? 'ADMIN'
            : 'No payment method',
        status: item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1),
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
    { key: 'amount', displayName: 'Total Amount' },
    { key: 'status', displayName: 'Status' },
    { key: 'paymentMethod', displayName: 'Payment Method' },
  ];

  useEffect(() => {
    getTableData();
  }, [page]);
  return (
    <Card
      shadow="sm"
      px={'lg'}
      py={'sm'}
      radius="md"
      className="bg-tertiary text-textPrimary overflow-y"
    >
      <CardSection
        px={10}
        py={10}
        className="flex flex-col gap-3 justify-around"
      >
        <div className="flex gap-4 items-center">
          <Title order={2}>Orders </Title>
        </div>
        <Suspense fallback={<Loading></Loading>}>
          <ScrollArea className="w-auto">
            <CustomTable columns={columns} elements={tableData}></CustomTable>
          </ScrollArea>
        </Suspense>
        <CustomPagination totalPages={total} />
      </CardSection>
    </Card>
  );
};

export default Page;
