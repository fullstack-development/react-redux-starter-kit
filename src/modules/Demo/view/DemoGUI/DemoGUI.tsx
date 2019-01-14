import * as React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { SimpleList, Button, Typography, CircleProgressBar } from 'shared/view/elements';

import { StylesProps, provideStyles } from './DemoGUI.style';
import { TextInputs, RadioGroups, Checkboxes } from './components';
import { ThemeSelector } from 'services/themeProvider';

function DemoGUI(_props: StylesProps) {
  const onSubmit = (values: Record<string, string | number>) => console.log(values);

  return (
    <div style={{ padding: 20 }}>
      <Form
        onSubmit={onSubmit}
        subscription={{ submitting: true, pristine: true }}
      >
        {({ handleSubmit }: FormRenderProps) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Select theme <ThemeSelector /></Typography>
            <SimpleList marginFactor={4} direction="row">
              <SimpleList marginFactor={2} gutter>
                <Typography variant="h4">Default color</Typography>
                <Button variant="outlined">Outlined</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined" disabled>Outlined disabled</Button>
                <Button variant="contained" disabled>Contained disabled</Button>
              </SimpleList>

              <SimpleList marginFactor={2} gutter>
                <Typography variant="h4">Primary color</Typography>
                <Button variant="outlined" color="primary">Outlined</Button>
                <Button variant="contained" color="primary">Contained</Button>
                <Button variant="outlined" color="primary" disabled>Outlined disabled</Button>
                <Button variant="contained" color="primary" disabled>Contained disabled</Button>
              </SimpleList>

              <SimpleList marginFactor={0} gutter>
                <Typography variant="h4">ProgressBar</Typography>
                <CircleProgressBar variant="indeterminate" size={100} value={85} />
              </SimpleList>
            </SimpleList>

            <TextInputs />

            <SimpleList marginFactor={4} direction="row">
              <RadioGroups />
              <Checkboxes />
            </SimpleList>
            <Button variant="outlined" type="submit">Submit</Button>
          </form>
        )}
      </Form>
    </div >
  );
}

export default provideStyles(DemoGUI);
