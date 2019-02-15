import React, { useState, useEffect } from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';
import { IProfile } from 'shared/types/models';

import { ProfileAvatar } from '../../components';
import { selectors } from '../../../redux';
import './ProfilePreview.scss';

interface IOwnProps {
  onEditClick(): void;
}

interface IStateProps {
  profile: IProfile;
}

type IProps = IOwnProps & IStateProps;

const b = block('profile-preview');

function mapState(state: IAppReduxState): IStateProps {
  return {
    profile: selectors.selectProfile(state),
  };
}

function ProfilePreview(props: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(documentClickEffect);
  const { profile: { avatarURL, name, nickname, age, bio }, onEditClick } = props;
  const blockRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div className={b()} ref={blockRef}>
      <div className={b('avatar')} onClick={handleAvatarClick}>
        <ProfileAvatar avatarURL={avatarURL} size="small" />
      </div>
      <div className={b('info', { open: isOpen })}>
        <div className={b('main-info')}>
          <div className={b('name')}>
            {name}
          </div>
          <div className={b('nickname-age')}>
            <div className={b('nickname')}>
              {nickname}
            </div>
            <div className={b('age')}>
              {age} y.o.
            </div>
          </div>
        </div>
        <div className={b('bio')}>
          {bio}
        </div>
        <div className={b('edit')} onClick={onEditClick}>
          Edit
        </div>
      </div>
    </div>
  );

  function documentClickEffect() {
    document.addEventListener('click', handleDocumentClick);
    return () => document.addEventListener('click', handleDocumentClick);
  }

  function handleDocumentClick(e: MouseEvent) {
    if (blockRef.current !== null && !blockRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  function handleAvatarClick() {
    setIsOpen(true);
  }

}

export default connect(mapState)(ProfilePreview);
