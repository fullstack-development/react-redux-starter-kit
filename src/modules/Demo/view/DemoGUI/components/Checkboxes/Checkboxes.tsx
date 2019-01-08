import * as React from 'react';

import { SimpleList, Typography } from 'shared/view/elements';
import { CheckboxInputField } from 'shared/view/form';
import { isRequired } from 'shared/validators';

function Checkboxes(_props: {}) {
  return (
    <SimpleList marginFactor={0} gutter>
      <Typography variant="h4">CheckBoxes</Typography>
      <CheckboxInputField name="box1" label="Standard" />
      <CheckboxInputField name="box2" label="Required" required validate={isRequired} />
      <CheckboxInputField name="box3" label="Disabled checked" disabled checked />
    </SimpleList>
  );
}

export default Checkboxes;
