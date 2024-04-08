import { Divider, ScrollArea } from '@mantine/core';
import ReviewCard from '../Cards/ReviewCard';
import QuestionAndAnswerForm from '../CheckoutForm/QuestionAndAnswerForm';

interface IReviewProps {
  name: string;
}
const QandA = ({ name }: IReviewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="sm:text-1xl xs:text-lg  md:text-1xl  font-bold">
        QandA for {name}
      </h1>

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
          <QuestionAndAnswerForm></QuestionAndAnswerForm>
        </div>
      </div>
    </div>
  );
};

export default QandA;
