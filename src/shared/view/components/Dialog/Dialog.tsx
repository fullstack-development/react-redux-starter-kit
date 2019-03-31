import React, { FunctionComponent } from 'react';
import block from 'bem-cn';
import MUIDialog, { DialogProps } from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import './Dialog.scss';

interface IProps extends DialogProps {
  title: string;
  onClose(): void;
}

const b = block('dialog');

class Dialog extends React.Component<IProps> {
  public static Content: FunctionComponent = (props) => {
    const { children } = props;
    return (
      <div className={b('content')}>
        {children}
      </div>
    );
  }

  public static Actions: FunctionComponent = (props) => {
    const { children } = props;
    return (
      <div className={b('actions')}>
        {children}
      </div>
    );
  }

  public render() {
    const { title, children, onClose, ...dialogProps } = this.props;
    return (
      <MUIDialog onClose={onClose} PaperProps={{ classes: { root: b('paper').toString() } }} {...dialogProps}>
        <div className={b()}>
          <div className={b('header')}>
            <Typography variant="h6">{title}</Typography>
          </div>
          {children}
        </div>
      </MUIDialog>
    );
  }
}

export { IProps as IDialogProps };
export default Dialog;
