import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { bind } from 'decko';

import { withTranslation, TranslationProps, tKeys } from 'services/i18n';
import { TextInputField, NumberInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';
import { IProfile } from 'shared/types/models';
import { actions as notificationServiceActions } from 'services/notification';
import {
  makeRequired, makeMaxCharactersValidator, makeMinCharactersValidator, composeValidators,
} from 'shared/validators';

import {
  fieldNames, MAX_BIO_LENGTH, MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_NICKNAME_LENGTH, MAX_NICKNAME_LENGTH,
} from './constants';
import { ProfileAvatar } from '../../components';
import { IProfileEditFormFields } from '../../../namespace';
import { actions, selectors } from './../../../redux';

import './ProfileEdit.scss';

interface IStateProps {
  profile: IProfile;
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & TranslationProps;

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
const { profile: translations } = tKeys.features;

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
    const { profile: { avatarURL }, t } = this.props;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <div className={b('avatar')}>
          <ProfileAvatar avatarURL={avatarURL} size="big" />
        </div>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField
              name={fieldNames.name}
              label={t(translations.name.getKey())}
              validate={this.makeValidateName()}
              t={t}
            />
          </div>
          <div className={b('field')}>
            <TextInputField
              name={fieldNames.nickname}
              label={t(translations.nickname.getKey())}
              validate={this.makeValidateNickname()}
              t={t}
            />
          </div>
          <div className={b('field')}>
            <NumberInputField name={fieldNames.age} label={t(translations.age.getKey())} />
          </div>
          <div className={b('field')}>
            <TextInputField
              name={fieldNames.bio}
              label={t(translations.bio.getKey())}
              multiline
              rowsMax={10}
              validate={this.makeValidateBio()}
              t={t}
            />
          </div>
          <div className={b('button')}>
            <Button variant="outlined" type="submit">{t(tKeys.shared.save.getKey())}</Button>
          </div>
        </div>
      </form>
    );
  }

  private makeValidateName() {
    return composeValidators(
      makeRequired(tKeys.shared.fieldIsRequiredError.getKey()),
      makeMinCharactersValidator(MIN_NAME_LENGTH, {
        key: tKeys.shared.fieldMinLengthError.getKey(),
        options: { minCharacters: MIN_NAME_LENGTH },
      }),
      makeMaxCharactersValidator(MAX_NAME_LENGTH, {
        key: tKeys.shared.fieldMaxLengthError.getKey(),
        options: { maxCharacters: MAX_NAME_LENGTH },
      }),
    );
  }

  private makeValidateNickname() {
    return composeValidators(
      makeRequired(tKeys.shared.fieldIsRequiredError.getKey()),
      makeMinCharactersValidator(MIN_NICKNAME_LENGTH, {
        key: tKeys.shared.fieldMinLengthError.getKey(),
        options: { minCharacters: MIN_NICKNAME_LENGTH },
      }),
      makeMaxCharactersValidator(MAX_NICKNAME_LENGTH, {
        key: tKeys.shared.fieldMaxLengthError.getKey(),
        options: { maxCharacters: MAX_NICKNAME_LENGTH },
      }),
    );
  }

  private makeValidateBio() {
    return composeValidators(
      makeRequired(tKeys.shared.fieldIsRequiredError.getKey()),
      makeMaxCharactersValidator(MAX_BIO_LENGTH, {
        key: tKeys.shared.fieldMaxLengthError.getKey(),
        options: { maxCharacters: MAX_BIO_LENGTH },
      }),
    );
  }

  @bind
  private handleFormSubmit(values: IProfileEditFormFields) {
    const { saveProfile, setNotification, t } = this.props;
    saveProfile(values);
    setNotification({ kind: 'info', text: t(tKeys.shared.notifications.saved.getKey()) });
  }
}

const connectedComponent = connect(mapState, mapDispatch)(ProfileEdit);
export { ProfileEdit, IProps as IProfileEditProps };
export default withTranslation()(connectedComponent);
