import React, { useState } from 'react';
import block from 'bem-cn';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';

import Layout from 'modules/shared/Layout/Layout';
import './RepositoriesSearchLayout.scss';

interface IFeatureProps {
  repositoriesSearchFeatureEntry: features.repositoriesSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('repositories-search-layout');

function RepositoriesSearchLayout(props: IProps) {
  const { repositoriesSearchFeatureEntry: { containers } } = props;
  const { RepositoriesSearchForm, RepositoriesSearchResults, RepositoriesSearchPagination } = containers;
  const [lastSubmittedFormState, setLastSubmittedFormState] =
    useState<features.repositoriesSearch.namespace.IRepositoriesSearchFormFields | null>(null);

  return (
    <Layout title="GitHub repositories search">
      <div className={b()}>
        <div className={b('search-form')}>
          <RepositoriesSearchForm onSubmit={setLastSubmittedFormState}/>
        </div>
        <div className={b('results')}>
          <RepositoriesSearchResults />
        </div>
        {lastSubmittedFormState !== null && // рендерить когда есть резалты?
          <div className={b('pagination')}>
            <RepositoriesSearchPagination formFields={lastSubmittedFormState} />
          </div>
        }
      </div>
    </Layout>
  );
}

export default featureConnect({
  repositoriesSearchFeatureEntry: features.repositoriesSearch.loadEntry,
})(RepositoriesSearchLayout);
