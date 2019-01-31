import * as React from 'react';
import block from 'bem-cn';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import './Dialog.scss';

interface IProps {
  title: string;
  isOpen: boolean;
  renderActions(): JSX.Element;
  onClose(): void;
}

const b = block('dialog');

class DialogComponent extends React.PureComponent<IProps> {
  public render() {
    const { title, isOpen, children, renderActions, onClose } = this.props;
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <div className={b()}>
          <div className={b('header')}>
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className={b('content')}>
          {children}
        </div>
        <div className={b('actions')}>
          {renderActions()}
        </div>
      </Dialog>
    );
  }
}

export default DialogComponent;
