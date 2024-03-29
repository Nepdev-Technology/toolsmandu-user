import { TextInput } from '@mantine/core';
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
        classNames={{
          input: 'bg-secondary border-1 border-black text-white',
          root: 'bg-secondary ',
          wrapper: ' ',
        }}
        style={{
          width: '100%',
        }}
        visibleFrom={visibleFrom}
        // className="sm:hidden"
        // leftSection={<IconSearch></IconSearch>}
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
            <IconSearch></IconSearch>
          </Link>
        }
      />
    </>
  );
};

export default SearchInput;
