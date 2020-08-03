import React from 'react';
import {FieldRenderProps} from 'react-final-form';

import Radio from '@material-ui/core/Radio';
import {getFieldWithComponent} from 'shared/helpers/react';
import block from 'bem-cn';
import Check from '@material-ui/icons/Check'

import './RadioChipField.scss';

type BaseProps = React.ComponentProps<typeof Radio> & FieldRenderProps;

interface IOwnProps {
  label: string;
}

type IProps = BaseProps & IOwnProps;

const b = block('radio-chip-field')

function RadioChipFieldComponent(props: IProps) {
  const {input, meta, label, ...rest} = props;

  return (
    <label className={b({active: input.checked})}>
      <span className={b('icon', {show: input.checked})}>
        <Check fontSize='small'/>
      </span>
      <span className={b('label')}>
        {label}
      </span>
      <span className={b('radio')}>
        <Radio {...input} {...rest}/>
      </span>
    </label>
  )
}

export const RadioChipField = getFieldWithComponent(RadioChipFieldComponent, 'radio');
