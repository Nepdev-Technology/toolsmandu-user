import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { normalizeDate } from '@/src/utils/normalizeDate';
import { Image, Text } from '@mantine/core';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Blog } from '../page';
import { AddToPageTitle } from '@/src/utils/Text/AddToPageTitle';

const getTableData = async (id: string) => {
  const http = new HttpService();
  try {
    const response: any = await http
      .service()
      .get(`${apiRoutes.blog.findOne}/${id}`, {
        next: {
          cache: 'no-store',
        },
      });
    if (response.status === 404) {
      redirect('/404');
    }
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const blogData: Blog = await getTableData(params.id);
  if (!blogData) {
    return {
      title: '404 - No blog found',
    };
  }
  const { id, title, image, metaTitle, metaDescription, metaKeywords } =
    blogData;

  return {
    title: AddToPageTitle(title),
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      url: `/${id}`,
      title: metaTitle || title,
      description: metaDescription,
      images: [image],
    },
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const blogData: Blog = await getTableData(params.id);
  if (!blogData) {
    redirect('/404');
  }
  return (
    <>
      {blogData && (
        <section className="relative bottom-1 mx-2 text-textPrimary">
          <div className="">
            <Image
              className="md:h-[50vh] xs:h-[20vh]  sm:h-[30vh] w-[100vw]           "
              src={process.env.NEXT_PUBLIC_IMAGE_URL + blogData.image}
              radius="sm"
            ></Image>
          </div>
          <article className="mt-2 flex flex-col  md:block gap-1">
            <div>
              <div className="flex justify-start gap-10 ">
                <Text className="text-textPrimary font-display flex gap-1">
                  <IconCalendar></IconCalendar>
                  {normalizeDate(blogData.createdAt)}
                </Text>
                <Text className="text-textPrimary font-display flex gap-1">
                  {' '}
                  <IconUser></IconUser> Admin
                </Text>
              </div>
              <h1 className="sm:text-2xl xs:text-xl xs:mt-[1rem]  md:text-3xl  font-bold ">
                {' '}
                {blogData.title}
              </h1>
            </div>
            <div className="mt-2">
              <div
                className="prose  "
                dangerouslySetInnerHTML={{
                  __html: blogData.description,
                }}
              />
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default page;
