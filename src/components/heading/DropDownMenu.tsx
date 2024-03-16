import { Container, Flex, Menu, rem, Text } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';

const DropDownMenu = () => {
  return (
    <Container className="bg-darkPrimary" fluid visibleFrom="sm">
      <Flex justify={'center'} align={'center'}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Text>Toggle menu</Text>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessageCircle
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Messages
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconPhoto style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSearch style={{ width: rem(14), height: rem(14) }} />
              }
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={
                <IconArrowsLeftRight
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Container>
  );
};

export default DropDownMenu;
