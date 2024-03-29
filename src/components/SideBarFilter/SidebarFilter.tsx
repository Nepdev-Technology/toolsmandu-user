import { Burger } from '@mantine/core';
import CategoryFilter from './CategoryFilter';

const SidebarFilter = () => {
  return (
    <nav className="flex flex-col text-textPrimary ">
      <Burger opened={true} hiddenFrom="sm" size="md" />
      <CategoryFilter></CategoryFilter>
    </nav>
  );
};

export default SidebarFilter;
