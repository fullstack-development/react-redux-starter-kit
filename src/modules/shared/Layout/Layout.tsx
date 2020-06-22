import React from 'react';
import { createSelector } from 'reselect';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { LanguageSelector, withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { withAsyncFeatures } from 'core';
import * as features from 'features';

import { routes } from '../../routes';
import { LayoutHeaderMenu, IHeaderMenuItem } from './LayoutHeaderMenu/LayoutHeaderMenu';
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
const selectMenuItems = createSelector(
  (props: IProps) => props.t,
  (t): IHeaderMenuItem[] => ([
    {
      path: routes.search.users.getRoutePath(),
      title: t(header.users),
    },
    {
      path: routes.search.repositories.getRoutePath(),
      title: t(header.repositories),
    },
  ]),
);

class LayoutComponent extends React.Component<IProps> {
  public render() {
    const { children, title, profileFeatureEntry: { containers }, location, t } = this.props;
    const { ProfilePreview } = containers;

    return (
      <div className={b()}>
        <header className={b('header')}>
          <div className={b('header-content')}>
            <div className={b('left-menu')}>
              <LayoutHeaderMenu menuItems={selectMenuItems(this.props)} activeItemPath={location.pathname} />
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

  @autobind
  private handleEditProfileClick() {
    const { history } = this.props;
    history.push(routes.profile.getRoutePath());
  }
}

const wrappedComponent = withTranslation()(withRouter(LayoutComponent));
const Layout = withAsyncFeatures({
  profileFeatureEntry: features.profile.loadEntry,
})(wrappedComponent);

export { Layout, LayoutComponent, IProps as ILayoutProps };
