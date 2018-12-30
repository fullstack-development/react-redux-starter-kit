import * as React from 'react';
import { Typography, AppBar, Toolbar } from '@material-ui/core';

import { provideStyles, StylesProps } from './Header.style';

interface IProps {
  children?: React.ReactNode;
}

class Header extends React.PureComponent<IProps & StylesProps> {
  public render() {
    const { children } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography>{children}</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export { IProps };
export default provideStyles(Header);
