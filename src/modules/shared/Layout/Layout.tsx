import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';

import { featureConnect } from 'core';
import * as features from 'features';

import LayoutHeaderMenu, { IHeaderMenuItem } from './LayoutHeaderMenu/LayoutHeaderMenu';
import routes from '../../routes';
import './Layout.scss';

interface IOwnProps {
  title: string;
}

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IOwnProps & IFeatureProps & RouteComponentProps;

const b = block('layout');

class Layout extends React.Component<IProps> {
  private menuItems: IHeaderMenuItem[] = [
    {
      path: routes.search.users.getRoutePath(),
      title: 'Users',
    },
    {
      path: routes.search.repositories.getRoutePath(),
      title: 'Repositories',
    },
  ];

  public render() {
    const { children, title, profileFeatureEntry: { containers } } = this.props;
    const { ProfilePreview } = containers;
    return (
      <div className={b()}>
        <header className={b('header')}>
          <div className={b('header-content')}>
            <div className={b('menu')}>
              <LayoutHeaderMenu menuItems={this.menuItems} />
            </div>
            <ProfilePreview onEditClick={this.handleEditProfileClick} />
          </div>
        </header>
        <div className={b('content')}>
          <h1 className={b('title')}>
            {title}
          </h1>
          {children}
        </div>
        <footer className={b('footer')}>
          <div className={b('footer-content')}>
            <a
              className={b('company-link')}
              href="https://fullstack-development.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fullstack Development
            </a>
          </div>
        </footer>
      </div>
    );
  }

  @bind
  private handleEditProfileClick() {
    const { history } = this.props;
    history.push(routes.profile.getRoutePath());
  }
}

export { Layout, IProps as ILayoutProps };
export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(withRouter(Layout));
