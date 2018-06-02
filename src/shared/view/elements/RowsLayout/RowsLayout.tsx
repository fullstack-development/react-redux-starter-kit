import * as React from 'react';
import { provideStyles, StylesProps } from './RowsLayout.style';
import Grid from '@material-ui/core/Grid/Grid';

interface IProps {
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

function RowsLayout({ children, footerContent, headerContent, classes }: IProps & StylesProps) {
  return (
    <Grid container className={classes.root} direction="column" alignItems="stretch">
      <Grid item>
        {headerContent}
      </Grid>
      <Grid item className={classes.content}>
        {children}
      </Grid>
      <Grid item>
        {footerContent}
      </Grid>
    </Grid>
  );
}

export { IProps };
export default provideStyles(RowsLayout);
