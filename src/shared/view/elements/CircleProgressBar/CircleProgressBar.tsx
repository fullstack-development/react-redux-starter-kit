import React from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
// eslint-disable-next-line import/no-unresolved
import { Omit } from '_helpers';

import { StylesProps, provideStyles } from './CircleProgressBar.style';

type IProps = Omit<CircularProgressProps, 'classes'> & StylesProps;

function CircleProgressBarComponent(props: IProps) {
  const { classes, ...rest } = props;
  return (
    <div className={classes.piechart}>
      <CircularProgress
        className={classes.overlay}
        variant="determinate"
        size={rest.size}
        value={100}
      />
      <CircularProgress
        className={classes.progress}
        {...rest}
      />
    </div>
  );
}

export const CircleProgressBar = provideStyles(CircleProgressBarComponent);
