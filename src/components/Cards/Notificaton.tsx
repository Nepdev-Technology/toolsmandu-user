import { normalizeDate } from '@/src/utils/normalizeDate';
import { Spoiler, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'; // Import React

// Define props interface
export interface IHeaderNotification {
  title: string;
  message: string;
  createdAt: string;
  link: string;
}

// Define HeaderNotification component
const HeaderNotification: React.FC<{
  notifications: IHeaderNotification[];
}> = ({ notifications }) => {
  return (
    <div className="  flex flex-col gap-2 mt-1 ">
      {notifications.length >= 1 ? (
        notifications.map((notification) => (
          <div
            className={`grid grid-cols-1 px-2 bg-primary rounded-sm py-2    `}
            key={notification.createdAt}
          >
            <div className="flex flex-col w-[20em] font-display  text-textPrimary gap-1 flex-1">
              <a
                href={notification.link}
                key={notification.title}
                target="_blank"
                className="flex justify-between  "
              >
                <p className="flex gap-2 items-center overflow-auto">
                  {' '}
                  <Text className="  font-bold flex gap-1 justify-center items-center ">
                    {notification.title}
                  </Text>{' '}
                </p>
                <Text className="text-xs underline text-blue-400">View</Text>
              </a>

              <Spoiler
                maxHeight={18}
                showLabel="Show more"
                hideLabel="Hide"
                transitionDuration={0}
                className="text-xs"
                classNames={{
                  control: 'text-xs',
                }}
              >
                <Text className="text-xs">{notification.message}</Text>
              </Spoiler>
            </div>
          </div>
        ))
      ) : (
        <div
          className={`grid grid-cols-1 w-40 px-2 bg-primary rounded-sm py-2    `}
        >
          <div className="flex flex-col w-[20em] font-display  text-textPrimary gap-1 flex-1">
            <p className="flex gap-2 items-center overflow-auto">
              <Text className="text-xs">No notification</Text>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNotification;
