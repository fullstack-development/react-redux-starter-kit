import React, { useState } from 'react';
import block from 'bem-cn';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';

import { withLayout } from '../../../../shared';
import './RepositoriesSearchLayout.scss';

interface IFeatureProps {
  repositoriesSearchFeatureEntry: features.repositoriesSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('repositories-search-layout');

function RepositoriesSearchLayout(props: IProps) {
  const { repositoriesSearchFeatureEntry: { containers } } = props;
  const { RepositoriesSearchForm, RepositoriesSearchResults } = containers;
  const [lastSubmittedFormState, setLastSubmittedFormState] =
    useState<features.repositoriesSearch.namespace.IRepositoriesSearchFormFields | null>(null);

  return (
    <div className={b()}>
      <div className={b('search-form')}>
        <RepositoriesSearchForm onSubmit={setLastSubmittedFormState}/>
      </div>
      <div className={b('results')}>
        {lastSubmittedFormState &&
          <RepositoriesSearchResults searchOptions={lastSubmittedFormState} />
        }
      </div>
    </div>
  );
}

export { RepositoriesSearchLayout, IProps as IRepositoriesSearchLayoutProps  };
export default withLayout('GitHub repositories search')(
  featureConnect({
    repositoriesSearchFeatureEntry: features.repositoriesSearch.loadEntry,
  })(RepositoriesSearchLayout),
);
