import { Avatar, Rating, Text } from '@mantine/core';

const ReviewCard = () => {
  return (
    <div className="flex gap-16 justify-around mt-[1rem] ">
      <div className="flex gap-2">
        <Avatar src={null} alt="no image here" />
        <Text>Name Parajuli</Text>
      </div>{' '}
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam,
        officiis! Fugit minus ea, perferendis eum consectetur quae vitae.
        Aliquid, quam reprehenderit? Maiores sed pariatur aliquid commodi atque
        sunt officiis natus?
      </Text>
      <Rating value={3.5} fractions={2} readOnly />
    </div>
  );
};

export default ReviewCard;
