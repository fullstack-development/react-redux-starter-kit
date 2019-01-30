import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import { Typography } from 'shared/view/elements';
import { CheckboxInputField } from 'shared/view/form';
import { isRequired } from 'shared/validators';
import { provideStyles, StylesProps } from './Checkboxes.style';

function Checkboxes({ classes }: StylesProps) {
  return (
    <Grid item className={classes.gridItem}>
      <Typography variant="h4">CheckBoxes</Typography>
      <CheckboxInputField name="box1" label="Standard" />
      <CheckboxInputField name="box2" label="Required" required validate={isRequired} />
      <CheckboxInputField name="box3" label="Disabled checked" disabled checked />
    </Grid>
  );
}

export default provideStyles(Checkboxes);
