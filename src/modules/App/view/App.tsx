import * as React from 'react';
import 'normalize.css';
import 'shared/view/styles/base.scss';
import './fonts';

class App extends React.Component {
  public render() {
    const { children } = this.props;

    return children;
  }
}

export default App;
