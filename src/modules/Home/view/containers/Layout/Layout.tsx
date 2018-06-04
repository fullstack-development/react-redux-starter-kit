import * as React from 'react';
import { featureConnect } from 'core';
import { Navbar } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

import * as searchRepositories from 'features/searchRepositories';

import { RowsLayout } from 'shared/view/elements';
import { Header, Footer } from 'shared/view/components';

import { homeRedirectPath, orderRedirectPath } from '../../../../routes';
import { Description, Search } from '../../components';
import { StylesProps, provideStyles } from './Layout.style';

interface IOwnProps {
  searchRepositoriesEntry: searchRepositories.Entry;
}

type Props = IOwnProps & StylesProps & RouteComponentProps<void>;

class HomeLayout extends React.PureComponent<Props> {
  public render() {
    const { classes, searchRepositoriesEntry } = this.props;
    const { SearchRepositoriesInput } = searchRepositoriesEntry.containers;

    return (
      <RowsLayout
        footerContent={<Footer />}
        headerContent={(
          <Header
            brandRedirectPath={homeRedirectPath}
            menuRedirectPaths={{ order: orderRedirectPath }}
          >
            <Navbar.Form pullRight>
              <SearchRepositoriesInput />
            </Navbar.Form>
          </Header>
        )}
      >
        <div className={classes.content}>
          <div className={classes.description}><Description /></div>
          <Search SearchRepositoriesInput={SearchRepositoriesInput} />
        </div>
      </RowsLayout>
    );
  }
}

export default (
  featureConnect({ searchRepositoriesEntry: searchRepositories.loadEntry })(
    provideStyles(HomeLayout),
  )
);
