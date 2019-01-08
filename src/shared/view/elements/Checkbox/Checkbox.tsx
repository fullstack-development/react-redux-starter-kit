<<<<<<< HEAD
import * as React from 'react';
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';

function Checkbox(props: CheckboxProps) {
  return (
    <MuiCheckbox color="primary" {...props} />
  );
}

export { CheckboxProps };
export default Checkbox;
=======
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';

export { CheckboxProps };
export default MuiCheckbox;
>>>>>>> mvp-base
