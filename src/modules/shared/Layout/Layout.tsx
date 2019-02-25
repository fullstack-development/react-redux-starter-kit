import React from 'react';
import block from 'bem-cn';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';

import { featureConnect } from 'core';
import * as features from 'features';
import routes from '../../routes';
import './Layout.scss';

interface IOwnProps {
  title: string;
}

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IOwnProps & IFeatureProps & RouteComponentProps & React.ComponentProps<'div'>;

const b = block('layout');

class Layout extends React.Component<IProps> {
  public render() {
    const { children, title, profileFeatureEntry: { containers } } = this.props;
    const { ProfilePreview } = containers;
    return (
      <div className={b()}>
        <header className={b('header')}>
          <div className={b('header-content')}>
            <div className={b('header-left-part')}>
              <span className={b('header-title')}>Search for:</span>
              <div className={b('tabs')}>
                {this.renderTab(routes.search.users.getRoutePath(), 'Users')}
                {this.renderTab(routes.search.repositories.getRoutePath(), 'Repositories')}
              </div>
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
            <a className={b('company-link')} href="https://fullstack-development.com" target="_blank">
              Fullstack Development
            </a>
          </div>
        </footer>
      </div>
    );
  }

  private renderTab(path: string, tabTitle: string) {
    return (
      <Link to={path} className={b('navigation-link')}>
        <div className={b('tab', { active: path === location.pathname })}>
          {tabTitle}
        </div>
      </Link>
    );
  }

  @bind
  private handleEditProfileClick() {
    const { history } = this.props;
    history.push(routes.profile.getRoutePath());
  }
}

export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(withRouter(Layout));
