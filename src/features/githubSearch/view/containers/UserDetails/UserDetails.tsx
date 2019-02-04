import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppReduxState } from 'shared/types/app';
import { IUser } from 'shared/types/models';
import { Dialog } from 'shared/view/components';

import { actions, selectors } from './../../../redux';
import './UserDetails.scss';

interface IOwnProps {
  userLogin: string | null; // think of login or username everywhere
  onClose(): void;
}

interface IStateProps {
  userDetails: IUser | null;
}

interface IActionProps {
  loadUserDetails: typeof actions.loadUserDetails;
}

type IProps = IStateProps & IActionProps & IOwnProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    userDetails: selectors.selectUserDetails(state),
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    loadUserDetails: actions.loadUserDetails,
  }, dispatch);
}

const b = block('user-details');

class UserDetails extends React.PureComponent<IProps> {
  public render() {
    const { userLogin } = this.props;
    return (
      <Dialog
        open={userLogin !== null}
        title="User details"
        onEnter={this.handleDialogEnter}
        onClose={this.handleDialogClose}
      >
        <div className={b()}>content</div>
      </Dialog>
    );
  }

  @bind
  private handleDialogEnter() {
    const { userLogin, loadUserDetails } = this.props;
    if (userLogin) {
      loadUserDetails(userLogin);
    }
  }

  @bind
  private handleDialogClose() {
    const { onClose } = this.props;
    onClose();
  }
}

export default connect(mapState, mapDispatch)(UserDetails);
