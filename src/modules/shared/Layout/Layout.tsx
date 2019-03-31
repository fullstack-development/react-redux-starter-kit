import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';

import { featureConnect } from 'core';
import * as features from 'features';
import { LanguageSelector, withTranslation, WithTranslation, tKeys } from 'services/i18n';

import LayoutHeaderMenu, { IHeaderMenuItem } from './LayoutHeaderMenu/LayoutHeaderMenu';
import routes from '../../routes';
import './Layout.scss';

interface IOwnProps {
  title: string;
}

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IOwnProps & IFeatureProps & RouteComponentProps & React.ComponentProps<'div'> & WithTranslation;

const b = block('layout');
const { header, footer } = tKeys.shared;

class Layout extends React.Component<IProps> {
  public render() {
    const { children, title, profileFeatureEntry: { containers }, t } = this.props;
    const { ProfilePreview } = containers;
    const menuItems: IHeaderMenuItem[] = [
      {
        path: routes.search.users.getRoutePath(),
        title: this.props.t(header.users.getKey()),
      },
      {
        path: routes.search.repositories.getRoutePath(),
        title: this.props.t(header.repositories.getKey()),
      },
    ];
    return (
      <div className={b()}>
        <header className={b('header')}>
          <div className={b('header-content')}>
            <div className={b('menu')}>
              <LayoutHeaderMenu menuItems={menuItems} />
            </div>
            <div>
              <ProfilePreview onEditClick={this.handleEditProfileClick} />
              <LanguageSelector />
            </div>
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
              {t(footer.fsd.getKey())}
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

const wrappedComponent = withTranslation()(withRouter(Layout));
export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(wrappedComponent);
