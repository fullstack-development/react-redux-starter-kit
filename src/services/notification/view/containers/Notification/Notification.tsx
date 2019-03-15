import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';

import { IAppReduxState } from 'shared/types/app';
import { INotification } from 'shared/types/common';

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

function Notification(props: IProps) {
  const { notification } = props;
  return notification && (
    <div className={b({ kind: notification.kind })}>
      <div className={b('text')}>
        {notification.text}
      </div>
    </div>
  );
}

export { Notification, IProps as INotificationProps };
export default connect(mapState)(Notification);
