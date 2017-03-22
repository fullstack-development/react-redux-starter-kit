import * as React from 'react';
import * as block from 'bem-cn';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/bootstrap.paper.min.css';
import 'shared/view/styles/base.scss';
import './styles.scss';
import './fonts';

class App extends React.Component<{}, {}> {
  public render() {
    const b = block('application');
    const { children } = this.props;

    return (
      <div className={b}>
        {children}
      </div>
    );
  }
}

export default App;
