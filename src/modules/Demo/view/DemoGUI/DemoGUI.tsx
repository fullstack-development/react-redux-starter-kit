import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { Button, Typography, CircleProgressBar, Grid } from 'shared/view/elements';
import { ThemeSelector } from 'services/theme';

import { StylesProps, provideStyles } from './DemoGUI.style';
import { TextInputs, RadioGroups, Checkboxes } from './components';

function DemoGUI({ classes }: StylesProps) {
  const onSubmit = (values: Record<string, string | number>) => console.log(values);

  return (
    <div className={classes.root}>
      <Form
        onSubmit={onSubmit}
        subscription={{ submitting: true, pristine: true }}
      >
        {({ handleSubmit }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Select theme<ThemeSelector /></Typography>
            <Grid container spacing={16}>
              <Grid container justify="flex-start" spacing={8}>
                <Grid item className={classes.gridItem}>
                  <Typography variant="h4">Default color</Typography>
                  <Button variant="outlined">Outlined</Button>
                  <Button variant="contained">Contained</Button>
                  <Button variant="outlined" disabled>Outlined disabled</Button>
                  <Button variant="contained" disabled>Contained disabled</Button>
                </Grid>

                <Grid item className={classes.gridItem}>
                  <Typography variant="h4">Primary color</Typography>
                  <Button variant="outlined" color="primary">Outlined</Button>
                  <Button variant="contained" color="primary">Contained</Button>
                  <Button variant="outlined" color="primary" disabled>Outlined disabled</Button>
                  <Button variant="contained" color="primary" disabled>Contained disabled</Button>
                </Grid>

                <Grid item className={classes.gridItem}>
                  <Typography variant="h4">ProgressBar</Typography>
                  <CircleProgressBar variant="indeterminate" size={100} value={85} />
                </Grid>
              </Grid>
              <Grid container justify="flex-start" spacing={8}>
                <TextInputs />
              </Grid>

              <Grid container justify="flex-start" spacing={8}>
                <RadioGroups />
                <Checkboxes />
              </Grid>
              <Grid container justify="flex-start" spacing={8}>
                <Button variant="outlined" type="submit">Submit</Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </div >
  );
}

export default provideStyles(DemoGUI);
