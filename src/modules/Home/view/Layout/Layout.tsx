import * as React from 'react';
import block from 'bem-cn';
import { featureConnect } from 'core';

import { RouteComponentProps } from 'react-router-dom';

import * as searchRepositories from 'features/searchRepositories';

import { Navbar } from 'react-bootstrap';
import RowsLayout from 'shared/view/elements/RowsLayout';
import Header from 'shared/view/components/Header/index';
import Description from './Description';
import Search from './Search';
import './Layout.scss';

interface IOwnProps {
  searchRepositoriesEntry: searchRepositories.Entry;
}

type Props = IOwnProps & RouteComponentProps<void>;

class HomeLayout extends React.PureComponent<Props, {}> {
  private b = block('index-page');

  public render() {
    const b = this.b;
    const { history } = this.props;
    const { SearchRepositoriesInput } = this.props.searchRepositoriesEntry.containers;

    return (
      <RowsLayout
        footerContent={<a href="http://fullstack-development.com/">FullStackDevelopment</a>}
        headerContent={(
          <Header onLinkClick={history.push}>
            <Navbar.Form pullRight>
              <SearchRepositoriesInput />
            </Navbar.Form>
          </Header>
        )}
      >
        <div className={b()}>
          <div className={b('content')()}>
            <Description />
            <Search SearchRepositoriesInput={SearchRepositoriesInput} />
          </div>
        </div>
      </RowsLayout>
    );
  }
}

export default (
  featureConnect({ searchRepositoriesEntry: searchRepositories.loadEntry })(
    HomeLayout,
  )
);
