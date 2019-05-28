import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppReduxState } from 'shared/types/app';

import { IReduxState } from '../../../namespace';
import { actions, selectors } from './../../../redux';

import './SomeContainer.scss';

interface IOwnProps {

}

interface IStateProps {

}

interface IActionProps {

}

type IProps = IStateProps & IActionProps & IOwnProps;

function mapState(state: IAppReduxState): IStateProps {
  return {};
}

function mapDispatch(dispatch: Dispatch<IAppReduxState>): IActionProps {
  return bindActionCreators({}, dispatch);
}

const b = block('block-name');

class SomeContainer extends React.PureComponent<IProps> {
  public render() {
    const {  } = this.props;
    return (
      <div className={b()}>content</div>
    );
  }
}

export { SomeContainer };
export default connect(mapState, mapDispatch)(SomeContainer);
