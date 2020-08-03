import BaseButton from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";

const Button = withStyles({
  root: {
    padding: '1rem 1.5rem',
    fontStyle: 'normal',
    fontSize: '1rem',
    lineHeight: '1rem',
    textAlign: 'center',
    letterSpacing: '0.15px',
    textTransform: 'none',
    boxShadow: 'none',
    '&.MuiButton-contained:hover': {
      boxShadow: 'none'
    }
  }
})(BaseButton);

export {Button}