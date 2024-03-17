import { Menu, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

const DropDownMenuItem = () => {
  return (
    <Menu shadow="md" width={200} trigger="hover">
      <Menu.Target>
        <Text className="flex justify-center items-center">
          Toggle menu <IconChevronDown></IconChevronDown>
        </Text>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Messages</Menu.Item>
        <Menu.Item>Gallery</Menu.Item>
        <Menu.Item>Search</Menu.Item>
        <Menu.Item>Transfer my data</Menu.Item>
        <Menu.Item>Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default DropDownMenuItem;
