import * as React from 'react';

import { Typography, MenuItem, Grid } from 'shared/view/elements';
import { TextInputField, MaskedInputField, NumberInputField } from 'shared/view/form';
import { isRequired } from 'shared/validators';
import { provideStyles, StylesProps } from './TextInputs.style';

function TextInputs({ classes }: StylesProps) {
  return (
    <>
      <Grid item className={classes.gridItem}>
        <Typography variant="h4">Underlined input</Typography>
        <TextInputField name="inp1" label="Your email" variant="standard" />
        <TextInputField
          name="inp2"
          label="Your email"
          placeholder="Will show error after unfocus"
          variant="standard"
          required
          validate={isRequired}
        />
        <TextInputField name="inp3" label="Your email" variant="standard" disabled />
        <TextInputField name="inp4" label="Select" variant="standard" select fullWidth>
          {[1, 2, 3, 4, 5].map(item => (
            <MenuItem key={item} value={item}>Item #{item}</MenuItem>
          ))}
        </TextInputField>
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="h4">Outlined input</Typography>
        <TextInputField name="inp5" label="Your email" variant="outlined" />
        <TextInputField
          name="inp6"
          label="Your email"
          placeholder="Will show error after unfocus"
          variant="outlined"
          required
          validate={isRequired}
        />
        <TextInputField name="inp7" label="Your email" variant="outlined" disabled />
        <TextInputField name="inp8" label="Select" variant="outlined" select fullWidth>
          {[1, 2, 3, 4, 5].map(item => (
            <MenuItem key={item} value={item}>Item #{item}</MenuItem>
          ))}
        </TextInputField>
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="h4">Multiline inputs</Typography>
        <TextInputField name="inp9" label="Static input" variant="outlined" multiline rows={3} />
        <TextInputField
          name="inp10"
          multiline
          rows={3}
          variant="outlined"
          label="Multiline with error"
          placeholder="Will show error after unfocus"
          required
          validate={isRequired}
        />
        <TextInputField name="inp11" label="Dynamic input" variant="outlined" multiline rowsMax={4} />
        <TextInputField name="inp12" label="Dynamic underlined" variant="standard" multiline rowsMax={4} />
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="h4">Other inputs</Typography>
        <MaskedInputField name="inp13" label="Visa input" variant="outlined" maskType="visa" />
        <TextInputField name="inp14" label="Password input" variant="outlined" type="password" />
        <NumberInputField
          name="inp15"
          label="Number input"
          variant="outlined"
          thousandSeparator
          prefix="$"
          decimalScale={2}
        />
      </Grid>
    </>
  );
}

export default provideStyles(TextInputs);
