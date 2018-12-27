import * as React from 'react';
import MuiRadio, { RadioProps } from '@material-ui/core/Radio';

function Radio(props: RadioProps) {
  return (
    <MuiRadio color="primary" {...props} />
  );
}

export default Radio;
