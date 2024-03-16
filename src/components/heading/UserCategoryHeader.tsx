import { Divider, Title } from '@mantine/core';

interface IUserCategoryHeader {
  title: string;
}
const UserCategoryHeader = ({ title }: IUserCategoryHeader) => {
  return (
    <div>
      <Divider
        color="gray"
        my="md"
        labelPosition="center"
        label={
          <div className="bg-darkPrimary px-2 py-1 rounded-md">
            <Title order={3} className="  text-textSecondary">
              {title}
            </Title>
          </div>
        }
      />
    </div>
  );
};

export default UserCategoryHeader;
