import * as React from 'react';
import * as block from 'bem-cn';
import { RouteComponentProps } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import RowsLayout from '../../../../shared/view/elements/RowsLayout';
import Header from '../../../../shared/view/components/Header/index';
import * as loadSearchRepositories from '../../../../features/searchRepositories/entry';
import Description from './Description';
import Search from './Search';
import { featureConnect } from 'core';
import './Layout.scss';
import { BundleLoader } from 'shared/types/app';

interface IOwnProps {
  searchRepositoriesEntry: loadSearchRepositories.Entry;
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
            12234556
            <Search SearchRepositoriesInput={SearchRepositoriesInput} />
          </div>
        </div>
      </RowsLayout>
    );
  }
}

const withFeatures = featureConnect({
  searchRepositoriesEntry: loadSearchRepositories as any as BundleLoader<any>,
})(HomeLayout);

export default withFeatures;
