import * as React from 'react';
import block from 'bem-cn';
import { Link } from 'react-router-dom';

import { routes } from '../../../routes';
import './Layout.scss';

const b = block('layout');

function Layout(props: React.ComponentProps<'div'>) {
  const { children } = props;
  return (
    <div className={b()}>
      <header className={b('header')}>
        Search for:
        <Link to={routes.search.users.getRoutePath()} className={b('navigation-link')}>Users</Link>
        <Link to={routes.search.repositories.getRoutePath()} className={b('navigation-link')}>Repositories</Link>
      </header>
      {children}
      <footer className={b('footer')}>
        <a className={b('company-link')} href="https://fullstack-development.com" target="_blank">
          Fullstack Development
        </a>
      </footer>
    </div>
  );
}

export default Layout;
