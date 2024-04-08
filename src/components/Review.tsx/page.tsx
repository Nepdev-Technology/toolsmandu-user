import { Divider, Group, Rating, ScrollArea, Stack, Text } from '@mantine/core';
import ReviewCard from '../Cards/ReviewCard';
import ReviewForm from '../CheckoutForm/ReviewForm';

interface IReviewProps {
  name: string;
}
const Review = ({ name }: IReviewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="sm:text-1xl xs:text-lg  md:text-1xl  font-bold">
        Review for {name}
      </h1>
      <div className="flex justify-around items-center ">
        <div className="flex flex-col items-center">
          <Text>Overall</Text>
          <Rating defaultValue={2} size="xl" readOnly />
          <Text>Out of 2</Text>
        </div>
        <Stack>
          <Group>
            <div>5 star</div>
            <Rating fractions={2} defaultValue={1.5} readOnly />
          </Group>
          <Group>
            <div>4 star</div>
            <Rating fractions={3} defaultValue={2.33333333} readOnly />
          </Group>
          <Group>
            <div>3 star</div>
            <Rating fractions={4} defaultValue={3.75} readOnly />
          </Group>
          <Group>
            <div>2 star</div>
            <Rating fractions={4} defaultValue={3.75} readOnly />
          </Group>
          <Group>
            <div>1 star</div>
            <Rating fractions={4} defaultValue={3.75} readOnly />
          </Group>
        </Stack>
      </div>
      <Divider></Divider>
      <ScrollArea
        h={{ md: 250, xs: 150, sm: 200 }}
        className="sm:mt-[1rem] md:mt-[2rem] "
      >
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
      </ScrollArea>
      <Divider></Divider>
      <div className="grid  md:grid-cols-2">
        <div>
          <ReviewForm></ReviewForm>
        </div>
      </div>
    </div>
  );
};

export default Review;
