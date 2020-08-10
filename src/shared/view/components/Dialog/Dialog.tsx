import React, { FunctionComponent } from 'react';
import block from 'bem-cn';
import MUIDialogBase, { DialogProps } from '@material-ui/core/Dialog';
import {withStyles} from "@material-ui/core";

import './Dialog.scss';

interface IProps extends DialogProps {
  title: string;
  onClose(): void;
}

const b = block('dialog');

const MUIDialog = withStyles({
  root: {
    margin: '1.5rem',
    '& .MuiPaper-rounded': {
      borderRadius: '0',
    },
    '& .MuiDialog-container': {
      marginLeft: '540px',
    },
    '& .MuiBackdrop-root': {
      left: '540px',
      backgroundColor: '#304ffe82',
    }
  }
})(MUIDialogBase);

class Dialog extends React.Component<IProps> {
  public static Content: FunctionComponent = props => {
    const { children } = props;
    return (
      <div className={b('content')}>
        {children}
      </div>
    );
  };

  public static Actions: FunctionComponent = props => {
    const { children } = props;
    return (
      <div className={b('actions')}>
        {children}
      </div>
    );
  };

  public render() {
    const { title, children, onClose, ...dialogProps } = this.props;
    return (
      <MUIDialog onClose={onClose} {...dialogProps}>
        <div className={b()}>
          {children}
        </div>
      </MUIDialog>
    );
  }
}

export { Dialog, IProps as IDialogProps };
