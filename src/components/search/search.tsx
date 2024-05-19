import { Button, Popover } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import SearchInput from './searchInput';

export function SearchBar() {
  return (
    <div>
      {' '}
      <div className="md:w-[35vw]">
        {' '}
        <SearchInput visibleFrom="sm"></SearchInput>
      </div>
      <Popover position="bottom">
        <Popover.Target>
          <Button
            px={10}
            hiddenFrom="sm"
            size="md"
            aria-label="SearchButton "
            className="xs:bg-quaternary"
          >
            <IconSearch></IconSearch>
          </Button>
        </Popover.Target>
        <Popover.Dropdown
          className="bg-primary border-none"
          style={{
            width: '100vw',
            backgroundColor: '#012651',
          }}
          variant="transparent"
        >
          <SearchInput></SearchInput>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
