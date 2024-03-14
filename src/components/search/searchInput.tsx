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
        input: 'bg-secondary',
        root: 'bg-secondary ',
        wrapper: 'border-secondary border-none',
      }}
      style={{
        width: '100%',
      }}
      visibleFrom={visibleFrom}
      // className="sm:hidden"
      leftSection={<IconSearch></IconSearch>}
      placeholder="Enter value to see debounce"
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
};

export default SearchInput;
