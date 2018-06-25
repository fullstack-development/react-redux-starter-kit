import * as React from 'react';
import { Typography } from '@material-ui/core';
import { StylesProps } from './Errors.style';

interface IProps {
  errors?: string[];
  hidden?: boolean;
}

function Errors({ hidden, errors = [], classes }: IProps & StylesProps) {
  return (
    <div className={classes.root}>
      {
        errors.map((error: string, index: number) => (
          <Typography
            key={index}
            gutterBottom
            color="error"
            component="span"
            className={classes.error}
          >
            {error}
          </Typography>
        ))
      }
    </div>
  );
}

export { IProps };
export default Errors;
