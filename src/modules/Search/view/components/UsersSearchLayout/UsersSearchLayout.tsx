import React, { useState } from 'react';
import block from 'bem-cn';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';

import { withLayout } from '../../../../shared';
import './UsersSearchLayout.scss';

interface IFeatureProps {
  usersSearchFeatureEntry: features.usersSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('users-search-layout');

function UsersSearchLayout(props: IProps) {
  const [lastSubmittedFormState, setLastSubmittedFormState] =
    useState<features.usersSearch.namespace.IUsersSearchFormFields | null>(null);

  const { usersSearchFeatureEntry: { containers } } = props;
  const { UsersSearchForm, UsersSearchResults } = containers;

  return (
    <div className={b()}>
      <div className={b('search-form')}>
        <UsersSearchForm onSubmit={setLastSubmittedFormState} />
      </div>
      {lastSubmittedFormState && <UsersSearchResults searchOptions={lastSubmittedFormState} />}
    </div>
  );
}

export { UsersSearchLayout, IProps as IUsersSearchLayoutProps  };
export default withLayout('GitHub users search')(
    featureConnect({
    usersSearchFeatureEntry: features.usersSearch.loadEntry,
  })(UsersSearchLayout),
);
