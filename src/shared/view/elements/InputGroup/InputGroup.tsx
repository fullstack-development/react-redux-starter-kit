import * as React from 'react';
import { Typography } from '@material-ui/core';
import { StylesProps, provideStyles } from './InputGroup.style';

interface IProps {
  label?: string;
  children?: React.ReactNode;
}

function InputGroup({ label, children, classes }: IProps & StylesProps) {
  return (
    <label className={classes.root}>
      <Typography variant="subheading" className={classes.label}>{label}</Typography>
      <div className={classes.input}>
        {children}
      </div>
    </label>
  );
}

export { IProps };
export default provideStyles(InputGroup);
