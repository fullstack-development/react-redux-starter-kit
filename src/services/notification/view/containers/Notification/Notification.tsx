import * as React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';

import { IAppReduxState } from 'shared/types/app';
import { INotification } from 'shared/types/ui';

import { selectors } from '../../../redux';
import './Notification.scss';

interface IStateProps {
  notification: INotification | null;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    notification: selectors.selectNotification(state),
  };
}

type IProps = IStateProps;

const b = block('notification');

class Notification extends React.PureComponent<IProps> {

  public render() {
    const { notification } = this.props;
    return (
      notification && this.renderContent(notification)
    );
  }

  private renderContent(notification: INotification) {
    const { kind, text } = notification;
    return (
      <div className={b({ kind })}>
        <div className={b('text')}>
          {text}
        </div>
      </div>
    );
  }
}

export default connect(mapState)(Notification);
