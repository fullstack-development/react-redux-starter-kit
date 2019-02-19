import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
