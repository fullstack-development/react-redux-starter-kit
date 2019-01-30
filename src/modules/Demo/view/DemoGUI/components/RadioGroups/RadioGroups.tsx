import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import { Typography, FormControlLabel, Radio } from 'shared/view/elements';
import { RadioGroupInputField } from 'shared/view/form';
import { isRequired } from 'shared/validators';
import { provideStyles, StylesProps } from './RadioGroups.style';

function RadioGroups({ classes }: StylesProps) {
  return (
    <>
      <Grid item className={classes.gridItem}>
        <Typography variant="h4">Radio button</Typography>
        <RadioGroupInputField name="radio1" label="Radio buttons">
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel disabled value="disabled" control={<Radio />} label="Disabled" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroupInputField>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="h4">Radio with error</Typography>
        <RadioGroupInputField error name="radio2" label="Required radio buttons" required validate={isRequired}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel disabled value="disabled" control={<Radio />} label="Disabled" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroupInputField>
      </Grid>
    </>
  );
}

export default provideStyles(RadioGroups);
