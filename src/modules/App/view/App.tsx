import React from 'react';

class App extends React.Component {
  public render() {
    const { children } = this.props;

    return children;
  }
}

export default App;
