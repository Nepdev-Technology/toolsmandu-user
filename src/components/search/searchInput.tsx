import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

const SearchInput = ({ visibleFrom }: { visibleFrom?: string }) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);

  return (
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
      leftSection={<IconSearch></IconSearch>}
      placeholder="Search..."
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
};

export default SearchInput;
