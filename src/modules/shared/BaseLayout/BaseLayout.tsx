import * as React from 'react';

import * as searchRepositories from 'features/searchRepositories';

import { RowsLayout } from 'shared/view/elements';
import { Header, Footer } from 'shared/view/components';

import { homeRedirectPath, orderRedirectPath } from '../../routes';
import { StylesProps, provideStyles } from './BaseLayout.style';
import { getAsyncContainer } from 'core/FeatureConnector';

interface IOwnProps {
  withSearch?: boolean;
  children: React.ReactNode;
}

type Props = IOwnProps & StylesProps;

const AsyncSearchInput = getAsyncContainer(searchRepositories.loadEntry, 'SearchRepositoriesInput');

class BaseLayout extends React.PureComponent<Props> {
  public render() {
    const { classes, children, withSearch } = this.props;

    return (
      <RowsLayout
        footerContent={<Footer />}
        headerContent={(
          <Header
            brandRedirectPath={homeRedirectPath}
            menuRedirectPaths={{ order: orderRedirectPath }}
          >
            {withSearch && <AsyncSearchInput />}
          </Header>
        )}
      >
        <div className={classes.content}>
          {children}
        </div>
      </RowsLayout>
    );
  }
}

export default provideStyles(BaseLayout);
