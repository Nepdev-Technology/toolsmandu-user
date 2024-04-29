'use client';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Button, Card, CardSection, Divider, Title } from '@mantine/core';
import { NextApiRequest, NextApiResponse } from 'next';
import Link from 'next/link';

const page = (req: NextApiRequest, res: NextApiResponse) => {
  // const pathname = usePathname();
  // const serachParams = useSearchParams();
  // const router = useRouter();

  // const query = serachParams.get('access_token');
  // const params = useParams();
  const verifyOrder = async (data: string) => {
    try {
      const http = new HttpService();
      console.log(`${apiRoutes.auth.google}/${data}`, 'this is the url');
      const response: any = await http
        .service()
        .get(`${apiRoutes.auth.google}${data}`, {
          next: {
            cache: 'no-store',
          },
        });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const hash = window.location.hash;
  //   console.log(hash);
  // }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <Card shadow="lg" px={40} py={30} withBorder>
        <CardSection>
          <Title order={1}>Payment Status</Title>
        </CardSection>
        <Divider></Divider>
        {/* <CardSection>
          {response?.success ? (
            <div className="flex flex-col items-center justify-center">
              {' '}
              <IconCheck size={200} color="green" />
              <Title order={2}>{response.message}</Title>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <IconAlertCircle size={200} color="red" />
              <Title order={2}>{response.message}</Title>
            </div>
          )}
        </CardSection> */}
        <p className="text-gray-600 my-2">
          Thank you for completing your secure online payment.
        </p>
        <p> Have a great day! </p>
        <div className="flex justify-center gap-3 mt-4">
          <Link href={`/`}>
            {' '}
            <Button>Go back</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
