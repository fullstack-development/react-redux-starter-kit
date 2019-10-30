import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { featureConnect } from 'core';
import * as features from 'features';
import { LanguageSelector, withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { memoizeByProps } from 'shared/helpers';

import { LayoutHeaderMenu, IHeaderMenuItem } from './LayoutHeaderMenu/LayoutHeaderMenu';
import { routes } from '../../routes';

import './Layout.scss';

interface IOwnProps {
  title: string;
}

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IOwnProps & IFeatureProps & RouteComponentProps & ITranslationProps;

const b = block('layout');
const { header, footer } = tKeys.shared;

class LayoutComponent extends React.Component<IProps> {
  public render() {
    const { children, title, location, profileFeatureEntry: { containers }, t } = this.props;
    const { ProfilePreview } = containers;

    return (
      <div className={b()}>
        <header className={b('header')}>
          <div className={b('header-content')}>
            <div className={b('left-menu')}>
              <LayoutHeaderMenu
                menuItems={this.getMenuItems()}
                currentPathname={location.pathname}
              />
            </div>
            <div className={b('right-menu')}>
              <ProfilePreview onEditClick={this.handleEditProfileClick} />
              <div className={b('language-selector')}><LanguageSelector /></div>
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
            <a
              className={b('company-link')}
              href="https://fullstack-development.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(footer.fsd)}
            </a>
          </div>
        </footer>
      </div>
    );
  }

  @memoizeByProps((props: IProps) => [props.t])
  private getMenuItems(): IHeaderMenuItem[] {
    const { t } = this.props;
    return [{
      path: routes.search.users.getRoutePath(),
      title: t(header.users),
    },
    {
      path: routes.search.repositories.getRoutePath(),
      title: t(header.repositories),
    }];
  }

  @autobind
  private handleEditProfileClick() {
    const { history } = this.props;
    history.push(routes.profile.getRoutePath());
  }
}

const wrappedComponent = withTranslation()(withRouter(LayoutComponent));
const Layout = featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(wrappedComponent);

export { Layout, LayoutComponent, IProps as ILayoutProps };
