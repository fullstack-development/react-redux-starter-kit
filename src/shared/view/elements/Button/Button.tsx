<<<<<<< HEAD
import * as React from 'react';
import { SubSet } from '_helpers';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';

type ICommonProps = Pick<ButtonProps, 'disabled' | 'onClick' | 'href' | 'variant'>;

type IProps = ICommonProps & {
  color?: SubSet<ButtonProps['color'], 'primary' | 'default'>;
};

function Button(props: IProps) {
  return (
    <MuiButton {...props} />
  );
}

export default Button;
=======
import MuiButton from '@material-ui/core/Button';

export default MuiButton;
>>>>>>> mvp-base
