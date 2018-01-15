import * as React from 'react';
import * as block from 'bem-cn';
import { bind } from 'decko';

import './SomeComponent.styl';

interface IProps {
  
}

const b = block('block-name');

class SomeComponent extends React.PureComponent<IProps, {}> {
  public render() {
    const {  } = this.props;
    return (
      <div className={b()}>content</div>
    );
  }
}

export default SomeComponent;
