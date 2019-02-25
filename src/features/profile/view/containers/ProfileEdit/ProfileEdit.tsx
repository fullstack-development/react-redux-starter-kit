import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { bind } from 'decko';

import { TextInputField, NumberInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';
import { IProfile } from 'shared/types/models';
import { actions as notificationServiceActions } from 'services/notification';

import { fieldNames } from './constants';
import { ProfileAvatar } from '../../components';
import { IProfileEditFormFields } from '../../../namespace';
import { actions, selectors } from './../../../redux';

import './ProfileEdit.scss';

interface IStateProps {
  profile: IProfile;
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    profile: selectors.selectProfile(state),
  };
}

const mapDispatch = {
  saveProfile: actions.saveProfile,
  setNotification: notificationServiceActions.setNotification,
};

const b = block('profile-edit');

class ProfileEdit extends React.PureComponent<IProps> {
  public render() {
    const { profile } = this.props;
    return (
      <Form
        onSubmit={this.handleFormSubmit}
        initialValues={profile}
        render={this.renderForm}
        subscription={{}}
      />
    );
  }

  @bind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { profile: { avatarURL } } = this.props;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <div className={b('avatar')}>
          <ProfileAvatar avatarURL={avatarURL} size="big" />
        </div>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField name={fieldNames.name} label="Name" />
          </div>
          <div className={b('field')}>
            <TextInputField name={fieldNames.nickname} label="Nickname" />
          </div>
          <div className={b('field')}>
            <NumberInputField name={fieldNames.age} label="Age" />
          </div>
          <div className={b('field')}>
            <TextInputField name={fieldNames.bio} label="Bio" multiline rowsMax={10}/>
          </div>
          <div className={b('button')}>
            <Button variant="outlined" type="submit">Save</Button>
          </div>
        </div>
      </form>
    );
  }

  @bind
  private handleFormSubmit(values: IProfileEditFormFields) {
    const { saveProfile, setNotification } = this.props;
    saveProfile(values);
    setNotification({ kind: 'info', text: 'User data was saved.' });
  }
}

export default connect(mapState, mapDispatch)(ProfileEdit);
