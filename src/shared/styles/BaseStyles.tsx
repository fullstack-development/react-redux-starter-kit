import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import { rule } from 'shared/helpers/style';

const styles = {
  '@global': rule({
    html: {
      fontSize: 16, // TODO: use rems everywhere in the project
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    body: {
      margin: 0,
      fontSize: '1rem',
      background: '#fff',
    },
    'html, body, #root': {
      height: '100%',
    },
    '*': {
      boxSizing: 'border-box',
    },
  }),
};

type StylesProps = WithStyles<typeof styles>;

const BaseStylesComponent: React.SFC<StylesProps> = () => null;

export const BaseStyles = withStyles(styles)(BaseStylesComponent);
