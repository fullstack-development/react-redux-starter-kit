import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Radio, FormControlLabel } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type BaseProps = React.ComponentProps<typeof Radio> & FieldRenderProps;

interface IOwnProps {
  label: string;
}

type IProps = BaseProps & IOwnProps;

function RadioFieldComponent(props: IProps) {
  const { input, meta, label, ...rest } = props;
  return (
    <FormControlLabel label={label} control={<Radio {...input} {...rest} />} />
  );
}

export const RadioField = getFieldWithComponent(RadioFieldComponent, 'radio');
