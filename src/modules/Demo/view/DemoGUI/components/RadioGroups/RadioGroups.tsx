import * as React from 'react';

import { SimpleList, Typography, FormControlLabel, Radio } from 'shared/view/elements';
import { RadioGroupInputField } from 'shared/view/form';
import { isRequired } from 'shared/validators';

function RadioGroups(_props: {}) {
  return (
    <SimpleList marginFactor={4} direction="row">
      <SimpleList marginFactor={2} gutter>
        <Typography variant="h4">Radio button</Typography>
        <RadioGroupInputField name="radio1" label="Radio buttons">
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel disabled value="disabled" control={<Radio />} label="Disabled" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroupInputField>
      </SimpleList>
      <SimpleList marginFactor={2}>
        <Typography variant="h4">Radio with error</Typography>
        <RadioGroupInputField error name="radio2" label="Required radio buttons" required validate={isRequired}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel disabled value="disabled" control={<Radio />} label="Disabled" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroupInputField>
      </SimpleList>
    </SimpleList>
  );
}

export default RadioGroups;
