import React from 'react';

import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { Radio, FormControlLabel } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type BaseProps = GetProps<typeof Radio> & FieldRenderProps;

interface IProps extends BaseProps {
  label: string;
}

function RadioField(props: IProps) {
  const { input, meta, label, ...rest } = props;
  return (
    <FormControlLabel label={label} control={<Radio {...input} {...rest} />} />
  );
}

export default getFieldWithComponent(RadioField, 'radio');
