import { Button, TextInput } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchInput = ({ visibleFrom }: { visibleFrom?: string }) => {
  const [value, setValue] = useState('');
  const router = useRouter();

  return (
    <>
      <TextInput
        variant="unstyled"
        classNames={{
          input: 'bg-quaternary text-white px-2',
        }}
        style={{
          width: '100%',
        }}
        visibleFrom={visibleFrom}
        // className="sm:hidden"
        // leftSection={<IconSearch></IconSearch>}
        radius="md"
        placeholder="Search..."
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyDown={getHotkeyHandler([
          [
            'Enter',
            () => {
              router.push(`/search?query=${value}`);
            },
          ],
        ])}
        rightSection={
          <Link
            href={{
              pathname: '/search',
              query: { query: value },
            }}
          >
            <Button>
              {' '}
              <IconSearch></IconSearch>
            </Button>
          </Link>
        }
      />
    </>
  );
};

export default SearchInput;
