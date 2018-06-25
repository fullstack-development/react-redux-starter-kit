import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';

import { withComponent } from 'shared/helpers';
import { provideStyles, StylesProps } from './Header.style';

const provideLinkComponent = withComponent(Link);
const ButtonLink = provideLinkComponent(Button);
const TypographyLink = provideLinkComponent(Typography);

type LinkName = 'order';

interface IProps {
  children?: React.ReactNode;
  brandRedirectPath: string;
  menuRedirectPaths: Record<LinkName, string>;
}

const textForMenuItem: Record<LinkName, string> = {
  order: 'Travel order form',
};

class Header extends React.PureComponent<IProps & StylesProps> {
  public render() {
    const { children, classes, brandRedirectPath, menuRedirectPaths } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <TypographyLink className={classes.link} to={brandRedirectPath} variant="display1" color="inherit">
            FSD Starter kit
          </TypographyLink>
          <div className={classes.content}>{children}</div>
          {Object.keys(menuRedirectPaths).map((key: LinkName) => (
            <ButtonLink
              key={key}
              className={classes.link}
              to={menuRedirectPaths[key]}
              variant="outlined"
              color="inherit"
            >
              {textForMenuItem[key]}
            </ButtonLink>
          ))}
        </Toolbar>
      </AppBar>
    );
  }
}

export { IProps };
export default provideStyles(Header);
