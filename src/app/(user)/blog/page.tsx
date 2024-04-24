import BlogCard from '@/src/components/Cards/BlogCard';
import { CustomPagination } from '@/src/components/mantine';
import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Box } from '@mantine/core';
import Link from 'next/link';
import { redirect } from 'next/navigation';
export interface Blog {
  id: number;
  createdAt: string;
  title: string;
  image: string;
  description: string;
  metaTitle: string;
  index: number;
  metaKeywords: string;
  featured: boolean;
  metaDescription: string;
}

const getTableData = async (page: string) => {
  const http = new HttpService();

  try {
    const response: any = await http
      .service()
      .get(`${apiRoutes.blog.all}?page=${page ? page : 1}&limit=${10}`, {
        next: {
          cache: 'no-store',
        },
      });
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};
const page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const blogRawData: any = await getTableData(searchParams.page);
  const blogData: Blog[] = blogRawData.result;
  return (
    <>
      {blogData && blogData.length >= 1 ? (
        <section className="relative bottom-1 text-textPrimary">
          <Box className="flex gap-4 flex-wrap mt-2 justify-center">
            {[...blogData].map((blog) => {
              return (
                <div key={blog.id}>
                  <Link href={`blog/${blog.id}`} className="py-0">
                    <BlogCard
                      id={blog.id}
                      title={blog.title}
                      imageUrl={blog.image}
                      imageAlt="PUBG"
                      createdAt={blog.createdAt}
                      metaTitle={blog.metaTitle}
                      metaDescription={blog.metaDescription}
                      metaKeywords={blog.metaKeywords}
                    />
                  </Link>
                </div>
              );
            })}
          </Box>
          <div className="mt-4 ml-4">
            <CustomPagination totalPages={blogRawData.totalCount} />
          </div>
        </section>
      ) : (
        <section className="relative bottom-1 text-textPrimary">
          <Box className="flex gap-4 flex-wrap mt-2 mx-10">No Blogs Found</Box>
        </section>
      )}
    </>
  );
};

export default page;
