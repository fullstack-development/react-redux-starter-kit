import * as React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppReduxState } from 'shared/types/app';

import { UITheme } from '../../../namespace';
import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';

interface IOption {
  value: UITheme;
  label: string;
}

interface IStateProps {
  uiTheme: UITheme;
}

interface IActionProps {
  setTheme: typeof actions.setTheme;
}

type Props = IStateProps & IActionProps;

class ThemeSelector extends React.PureComponent<Props> {
  public static options: IOption[] = [
    { value: 'blue', label: 'blue' },
    { value: 'darkBlue', label: 'darkBlue' },
  ];

  public render() {
    const { uiTheme } = this.props;

    return (
      <div>
        <select value={uiTheme} onChange={this.changeTheme}>
          {ThemeSelector.options.map(({ value, label }, i) => (
            <option value={value} key={i}>{label}</option>
          ))}
        </select>
      </div>
    );
  }

  @bind
  private changeTheme({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    this.props.setTheme(value as UITheme);
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    uiTheme: selectors.selectUITheme(state),
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    setTheme: actions.setTheme,
  }, dispatch);
}

export { ThemeSelector };
export default connect(mapState, mapDispatch)(ThemeSelector);
