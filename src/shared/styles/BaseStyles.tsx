import { withStyles } from 'shared/styles';
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
    },
    'html, body, #root': {
      height: '100%',
    },
  }),
};

export default withStyles(styles)();
