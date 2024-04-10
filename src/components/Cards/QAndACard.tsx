import { normalizeDate } from '@/src/utils/normalizeDate';
interface IReviewCard {
  fullName: string;
  content: string;
  date: string;
  replies: Array<any>;
}
const QAndACard = ({ fullName, content, date, replies }: IReviewCard) => {
  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex flex-col gap-4 bg-tertiary p-4">
        <div className="flex justify justify-between">
          <div className="flex gap-2">
            <div className="w-7 h-7 text-center rounded-full bg-red-500">
              {fullName?.split('')[0]}
            </div>
            <span>{fullName}</span>
          </div>
        </div>

        <div>{content}</div>
        {replies &&
          replies?.length >= 1 &&
          replies.map((reply) => {
            return (
              <div className="mx-10" key={reply.id}>
                {' '}
                <div className="flex gap-2 ">
                  <div className="w-7 h-7 text-center rounded-full bg-gray-500">
                    {reply.externalUser.userName?.split('')[0]}
                  </div>
                  <span>{reply.externalUser.userName}</span>
                  <span>{normalizeDate(reply.createdAt)}</span>
                </div>
                <div>{reply.content}</div>
              </div>
            );
          })}

        <div className="flex justify-between">
          <span>Feb 13, 2021</span>
        </div>
      </div>
    </div>
  );
};

export default QAndACard;
