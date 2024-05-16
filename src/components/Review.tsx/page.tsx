import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { checkedLoggedInInServerComponent } from '@/src/utils/checkedLoggedInInServerComponent';
import { Divider, Group, Rating, ScrollArea, Stack, Text } from '@mantine/core';
import { redirect } from 'next/navigation';
import ReviewCard from '../Cards/ReviewCard';
import ReviewForm from '../CheckoutForm/ReviewForm';

interface IReviewProps {
  name: string;
  id: string;
}
const getReviewData = async (id: string) => {
  const http = new HttpService();
  try {
    const response: any = await http
      .service()
      .get(`${apiRoutes.review.find}/${id}`, {
        next: {
          cache: 'no-store',
        },
      });
    const data = response.data.data;
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      // Redirect to the maintenance page
      redirect('/maintainance');
    }
  }
};
const Review = async ({ name, id }: IReviewProps) => {
  const review = await getReviewData(id);
  const isLoggedIn = checkedLoggedInInServerComponent();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="sm:text-1xl xs:text-lg  md:text-1xl  font-bold">
        Rating & Reviews for {name}
      </h1>
      <div className="flex justify-around items-center ">
        <div className="flex flex-col items-center">
          <Text>Overall</Text>
          <Rating
            defaultValue={Math.floor(review.totalRating)}
            fractions={
              (review.totalRating - Math.floor(review.totalRating)) * 100
            }
            size="xl"
            readOnly
          />
          <Text>{review.totalRating}</Text>
        </div>
        <Stack>
          <>
            {' '}
            {review.ratings.map((item: any) => {
              return (
                <Group key={item.id}>
                  <div>{item.star} star</div>
                  <Rating defaultValue={item.count} readOnly />
                </Group>
              );
            })}
          </>
        </Stack>
      </div>
      <Divider></Divider>
      {review?.reviews?.length >= 1 ? (
        <>
          {' '}
          <ScrollArea h={{ md: 400, xs: 350, sm: 300 }}>
            <div>
              {review.reviews.map((item: any) => {
                return (
                  <div key={item.id}>
                    <ReviewCard
                      createdAt={item.createdAt}
                      fullName={item.externalUser.userName}
                      rating={item.rating}
                      content={item.content}
                      date={item.createdAt}
                      replies={item.replies}
                    ></ReviewCard>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <Divider></Divider>
        </>
      ) : (
        <div>No review posted! Buy the product to review it </div>
      )}

      <div className="grid  md:grid-cols-2">
        <div>
          <ReviewForm isLoggedIn={isLoggedIn}></ReviewForm>
        </div>
      </div>
    </div>
  );
};

export default Review;
