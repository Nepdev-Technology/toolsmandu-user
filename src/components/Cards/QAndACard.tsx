import { giveFullName } from '@/src/utils/fullName';
import { normalizeDate } from '@/src/utils/normalizeDate';
interface IReviewCard {
  fullName: string;
  content: string;
  createdAt: string;
  replies: Array<any>;
}
const QAndACard = ({ fullName, content, replies, createdAt }: IReviewCard) => {
  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex flex-col gap-4 bg-tertiary p-4">
        <div className="flex justify justify-between">
          <div className="flex gap-2">
            <div className="w-7 h-7 text-center rounded-full bg-red-500">
              {fullName?.split('')[0]}
            </div>
            <span>{fullName}</span>
            <span>{normalizeDate(createdAt)}</span>
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
                    {/* {reply.externalUser.userName?.split('')[0]} */}T
                  </div>
                  {/* <span>{giveFullName(reply?.externalUser)}</span>
                  commented due to no data from backend */}
                  <span>Toolsmandu Admin</span>
                  <span>{normalizeDate(reply.createdAt)}</span>
                </div>
                <div className="mt-3">{reply.content}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default QAndACard;
