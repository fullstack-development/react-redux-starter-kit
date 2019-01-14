import * as React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { IAppReduxState } from 'shared/types/app';

import { UITheme } from '../../../namespace';
import { selectors } from '../../../redux';
import { getTheme } from '../../../themeFactory/themeFactory';

interface IOwnProps {
  disableStylesGeneration?: boolean;
}

interface IStateProps {
  uiTheme: UITheme;
}

type Props = IStateProps & IOwnProps;

class ThemeProvider extends React.PureComponent<Props> {
  public render() {
    const { children, uiTheme, disableStylesGeneration } = this.props;

    return (
      <MuiThemeProvider theme={getTheme(uiTheme)} disableStylesGeneration={disableStylesGeneration}>
        {children}
      </MuiThemeProvider>
    );
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    uiTheme: selectors.selectUITheme(state),
  };
}

export default connect(mapState)(ThemeProvider);
