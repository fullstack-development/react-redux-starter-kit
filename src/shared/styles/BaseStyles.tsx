import React from 'react';
import { rule } from 'shared/helpers/style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

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

class BaseStyles extends React.Component<StylesProps> {
  public render() {
    return null;
  }
}

export default withStyles(styles)(BaseStyles);
