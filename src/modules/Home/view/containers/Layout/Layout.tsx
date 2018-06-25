import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { getAsyncContainer } from 'core/FeatureConnector';
import BaseLayout from 'modules/shared/BaseLayout/BaseLayout';
import * as searchRepositories from 'features/searchRepositories';

import { Description, Search } from '../../components';
import { StylesProps, provideStyles } from './Layout.style';

type Props = StylesProps & RouteComponentProps<void>;

const AsyncSearchInput = getAsyncContainer(searchRepositories.loadEntry, 'SearchRepositoriesInput');

class HomeLayout extends React.PureComponent<Props> {
  public render() {
    const { classes } = this.props;

    return (
      <BaseLayout withSearch>
        <div className={classes.description}><Description /></div>
        <Search SearchRepositoriesInput={AsyncSearchInput} />
      </BaseLayout>
    );
  }
}

export default provideStyles(HomeLayout);
