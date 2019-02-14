import * as React from 'react';
import block from 'bem-cn';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { routes } from '../../../routes';
import './Layout.scss';

interface IOwnProps {
  title: string;
}

type IProps = IOwnProps & RouteComponentProps & React.ComponentProps<'div'>;

const b = block('layout');

function Layout(props: IProps) {
  const { children, location, title } = props;

  return (
    <div className={b()}>
      <header className={b('header')}>
        <span className={b('header-title')}>Search for:</span>
        <div className={b('tabs')}>
          {renderTab(routes.search.users.getRoutePath(), 'Users')}
          {renderTab(routes.search.repositories.getRoutePath(), 'Repositories')}
        </div>
      </header>
      <div className={b('content')}>
        <h1 className={b('title')}>
          {title}
        </h1>
        {children}
      </div>
      <footer className={b('footer')}>
        <a className={b('company-link')} href="https://fullstack-development.com" target="_blank">
          Fullstack Development
        </a>
      </footer>
    </div>
  );

  function renderTab(path: string, tabTitle: string) {
    return (
      <Link to={path} className={b('navigation-link')}>
        <div className={b('tab', { active: path === location.pathname })}>
          {tabTitle}
        </div>
      </Link>
    );
  }
}

export default withRouter(Layout);
