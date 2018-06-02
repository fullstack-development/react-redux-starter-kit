import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { withComponent } from '../../../helpers';
import { provideStyles, StylesProps } from './Footer.style';

const TypographyLink = withComponent('a')(Typography);

class Footer extends React.PureComponent<StylesProps> {
  public render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" color="default">
        <Toolbar classes={{ root: classes.toolbarRoot }}>
          <TypographyLink
            className={classes.link}
            variant="subheading"
            color="primary"
            href="http://fullstack-development.com/"
            target="_blank"
          >
            FullStackDevelopment
          </TypographyLink>
        </Toolbar>
      </AppBar>
    );
  }
}

export default provideStyles(Footer);
