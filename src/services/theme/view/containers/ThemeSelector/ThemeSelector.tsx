import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

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

  @autobind
  private changeTheme({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    this.props.setTheme(value as UITheme);
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    uiTheme: selectors.selectUITheme(state),
  };
}

const mapDispatch: IActionProps = {
  setTheme: actions.setTheme,
};

export { ThemeSelector };
export default connect(mapState, mapDispatch)(ThemeSelector);
