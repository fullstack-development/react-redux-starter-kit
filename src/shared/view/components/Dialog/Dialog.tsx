import React from 'react';
import block from 'bem-cn';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import './Dialog.scss';

interface IProps extends DialogProps {
  title: string;
  onClose(): void;
  renderActions?(): JSX.Element;
}

const b = block('dialog');

class DialogComponent extends React.PureComponent<IProps> {
  public render() {
    const { title, children, renderActions, onClose, ...dialogProps } = this.props;
    return (
      <Dialog onClose={onClose} {...dialogProps}>
        <div className={b()}>
          <div className={b('header')}>
            <Typography variant="h6">{title}</Typography>
          </div>
          <div className={b('content')}>
            {children}
          </div>
          {renderActions &&
            <div className={b('actions')}>
              {renderActions()}
            </div>
          }
        </div>
      </Dialog>
    );
  }
}

export default DialogComponent;
