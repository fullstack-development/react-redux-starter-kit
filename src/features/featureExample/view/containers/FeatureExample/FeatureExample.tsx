import * as React from 'react';
import { block } from 'bem-cn';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';

import { actions, selectors } from './../../../redux';

import './FeatureExample.scss';

interface IStateProps {
  count: number;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    count: selectors.selectCount(state),
  };
}

const mapDispatch = {
  onIncrement: actions.increment,
};

type DispatchProps = typeof mapDispatch;

type Props = IStateProps & DispatchProps;

const b = block('feature-example');

class FeatureExample extends React.Component<Props> {
  public render() {
    return (
      <div className={b('container')}>
        <div className={b('count')}>
          {this.props.count}
        </div>
        <button onClick={this.props.onIncrement}>
          Increase
        </button>
      </div>
    );
  }
}

export default connect<IStateProps, DispatchProps, {}>(mapState, mapDispatch)(FeatureExample);
