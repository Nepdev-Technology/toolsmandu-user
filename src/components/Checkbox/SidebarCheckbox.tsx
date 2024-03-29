import { Checkbox } from '@mantine/core';
import { useState } from 'react';

export default function SideBarCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox button"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}
