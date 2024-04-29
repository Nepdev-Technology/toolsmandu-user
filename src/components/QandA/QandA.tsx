import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { checkedLoggedInInServerComponent } from '@/src/utils/checkedLoggedInInServerComponent';
import { Divider, ScrollArea } from '@mantine/core';
import { redirect } from 'next/navigation';
import QAndACard from '../Cards/QAndACard';
import QuestionAndAnswerForm from '../CheckoutForm/QuestionAndAnswerForm';

interface IReviewProps {
  name: string;
  id: string;
}
const getQandA = async (id: string) => {
  const http = new HttpService();
  try {
    const response: any = await http
      .service()
      .get(`${apiRoutes.qAndA.find}/${id}`, {
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
const QandA = async ({ name, id }: IReviewProps) => {
  const qandA = await getQandA(id);
  const isLoggedIn = checkedLoggedInInServerComponent();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="sm:text-1xl xs:text-lg  md:text-1xl  font-bold">
        QandA for {name}
      </h1>
      {qandA && qandA.length >= 1 ? (
        <>
          <ScrollArea h={{ md: 400, xs: 350, sm: 300 }}>
            <div>
              {qandA.map((item: any) => {
                return (
                  <div key={item.id}>
                    <QAndACard
                      fullName={item.externalUser.userName}
                      content={item.content}
                      date={'2022-12-13'}
                      replies={item.replies}
                    ></QAndACard>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <Divider></Divider>
        </>
      ) : (
        <div>No Question and Answer! Try asking questions below</div>
      )}

      <div className="grid  md:grid-cols-2">
        <div>
          <QuestionAndAnswerForm
            isLoggedIn={isLoggedIn}
          ></QuestionAndAnswerForm>
        </div>
      </div>
    </div>
  );
};

export default QandA;
