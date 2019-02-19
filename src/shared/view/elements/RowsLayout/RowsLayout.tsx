import React from 'react';
import { provideStyles, StylesProps } from './RowsLayout.style';
import Grid from '@material-ui/core/Grid/Grid';

interface IProps {
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  background?: 'primary' | 'unset';
}

function RowsLayout({ children, footerContent, headerContent, classes }: IProps & StylesProps) {
  return (
    <Grid container className={classes.root} direction="column" alignItems="stretch">
      {!!headerContent && <Grid item>{headerContent}</Grid>}
      {!!children && <Grid item className={classes.content}>{children}</Grid>}
      {!!footerContent && <Grid item>{footerContent}</Grid>}
    </Grid>
  );
}

export { IProps };
export default provideStyles(RowsLayout);
