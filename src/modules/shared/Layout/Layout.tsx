import * as React from 'react';
import block from 'bem-cn';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

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

function Layout(props: IProps) {
  const { children, location, title, profileFeatureEntry: { containers } } = props;
  const { ProfilePreview } = containers;

  return (
    <div className={b()}>
      <header className={b('header')}>
        <div className={b('header-left-part')}>
          <span className={b('header-title')}>Search for:</span>
          <div className={b('tabs')}>
            {renderTab(routes.search.users.getRoutePath(), 'Users')}
            {renderTab(routes.search.repositories.getRoutePath(), 'Repositories')}
          </div>
        </div>
        <ProfilePreview onEditClick={handleEditProfileClick} />
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

  function handleEditProfileClick() {
    const { history } = props;
    history.push(routes.profile.getRoutePath());
  }
}

export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(withRouter(Layout));
