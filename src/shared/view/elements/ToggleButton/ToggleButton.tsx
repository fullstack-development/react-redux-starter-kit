import * as React from 'react';
import MuiToggleButton, { ToggleButtonProps } from '@material-ui/lab/ToggleButton';

import { StylesProps, provideStyles } from './ToggleButton.style';
import { Omit } from '_helpers';

type IProps = Omit<ToggleButtonProps, 'classes'> & StylesProps;

function ToggleButton(props: IProps) {
  return (
    <MuiToggleButton classes={props.classes} {...props} />
  );
}

export default provideStyles(ToggleButton);
