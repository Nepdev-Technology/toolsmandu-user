import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';

const getTableData = async (id: string) => {
  const http = new HttpService();
  const response: any = await http.service().get(apiRoutes.products.featured, {
    next: {
      cache: 'no-store',
    },
  });
  const array = response.data;
  return array;
};
const page = async ({ params }: { params: { id: string } }) => {
  const prouctData = await getTableData(params.id);
  return <div className="bg-black">{JSON.stringify(prouctData)}</div>;
};

export default page;
