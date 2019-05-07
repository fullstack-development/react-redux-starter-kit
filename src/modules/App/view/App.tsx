import React from 'react';
import { containers as NotificationContainers } from 'services/notification';
import { BaseStyles } from 'shared/styles';

class App extends React.Component {
  public render() {
    const { children } = this.props;

    return (
      <>
        <BaseStyles />
        <NotificationContainers.Notification />
        {children}
      </>
    );
  }
}

export default App;
