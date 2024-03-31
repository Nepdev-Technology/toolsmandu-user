import { Checkbox } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import classes from './Demo.module.css';

interface ISidebarCheckboxProps {
  label: string;
  id: string;
}
export default function SideBarCheckbox({ label, id }: ISidebarCheckboxProps) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeQueryParams = (query: string) => {
    const search = searchParams.get('query');

    const category = searchParams.get('category');
    const categorySearchArray =
      category && category?.length >= 1 ? category?.split('--') : [];
    if (!categorySearchArray?.includes(query)) {
      categorySearchArray?.push(query);
    } else {
      const index = categorySearchArray.indexOf(query);
      if (index !== -1) {
        categorySearchArray.splice(index, 1);
      }
    }
    const combinedCategory = categorySearchArray?.join('--');
    console.log(combinedCategory);
    const newUrl = `${pathname}?query=${search}&category=${combinedCategory}`;
    router.push(newUrl);
  };

  const handleChecked = (name: string) => {
    changeQueryParams(name);
  };

  return (
    <Checkbox
      classNames={classes}
      id={id}
      label={label}
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => {
          setChecked((c) => !c);
          handleChecked(label);
        },
      }}
    />
  );
}
