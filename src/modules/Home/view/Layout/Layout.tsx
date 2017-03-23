import * as React from 'react';
import * as block from 'bem-cn';
import { Navbar } from 'react-bootstrap';
import RowsLayout from '../../../../shared/view/elements/RowsLayout';
import Header from '../../../../shared/view/components/Header/index';
import { SearchRepositoriesInput } from '../../../../features/searchRepositories';
import Description from './Description';
import Search from './Search';
import './Layout.scss';

class HomeLayout extends React.PureComponent<{}, {}> {
  private b = block('index-page');

  public render() {
    const b = this.b;

    return (
      <RowsLayout
        footerContent={<a href="http://fullstack-development.com/">FullStackDevelopment</a>}
        headerContent={(
            <Header>
                <Navbar.Form pullRight>
                    <SearchRepositoriesInput />
                </Navbar.Form>
            </Header>
        )}
      >
        <div className={b()}>
          <div className={b('content')}>
            <Description />
            <Search />
          </div>
        </div>
      </RowsLayout>
    );
  }
}

export default HomeLayout;
