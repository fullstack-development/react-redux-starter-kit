import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { ICakePreview } from 'shared/types/models';
import { IAppReduxState } from 'shared/types/app';

import { actions, selectors } from './../../../redux';
import { CakePreview } from '../../components';
import { provideStyles, StylesProps } from './CakePreviewList.style';

interface IStateProps {
  cakesPreview: ICakePreview[];
}

interface IActionProps {
  loadCakesPreview: typeof actions.loadCakesPreview;
}

type IProps = IStateProps & IActionProps & StylesProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    cakesPreview: selectors.selectCakesPreview(state),
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    loadCakesPreview: actions.loadCakesPreview,
  }, dispatch);
}

class CakePreviewList extends React.PureComponent<IProps> {
  public componentDidMount() {
    const { loadCakesPreview } = this.props;
    loadCakesPreview();
  }

  public render() {
    const { classes, cakesPreview } = this.props;
    return (
      <ul className={classes.root}>
        {cakesPreview.map(this.renderCakesPreview)}
      </ul>
    );
  }

  @bind
  private renderCakesPreview(cakePreview: ICakePreview) {
    const { classes } = this.props;
    return (
      <li className={classes['cake-preview']}>
        <CakePreview cakePreview={cakePreview}/>
      </li>
    );
  }
}

export default connect(mapState, mapDispatch)(provideStyles(CakePreviewList));
