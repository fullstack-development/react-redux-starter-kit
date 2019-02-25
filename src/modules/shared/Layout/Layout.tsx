import React from 'react';
import block from 'bem-cn';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // TODO: move

import { MenuIcon } from 'shared/view/elements';
import { featureConnect } from 'core';
import * as features from 'features';

import routes from '../../routes';
import './Layout.scss';

interface IState {
  isMenuOpen: boolean;
}

interface IOwnProps {
  title: string;
}

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IOwnProps & IFeatureProps & RouteComponentProps & React.ComponentProps<'div'>;

const b = block('layout');

class Layout extends React.Component<IProps> {
  public state: IState = {
    isMenuOpen: false,
  };

  public render() {
    const { isMenuOpen } = this.state;
    const { children, title, profileFeatureEntry: { containers } } = this.props;
    const { ProfilePreview } = containers;
    return (
      <div className={b()}>
        <header className={b('header')}>
          <div className={b('header-content')}>
            <div className={b('header-left-part')}>
              <div className={b('menu', { open: isMenuOpen })} onMouseUp={this.handleMenuMouseup}>
                <MenuIcon />
              </div>
              <span className={b('header-title')}>Search for:</span>
              <ClickAwayListener onClickAway={this.handleTabsClickAway}>
                <div className={b('tabs')}>
                  {this.renderTab(routes.search.users.getRoutePath(), 'Users')}
                  {this.renderTab(routes.search.repositories.getRoutePath(), 'Repositories')}
                </div>
              </ClickAwayListener>
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

  @bind
  private handleMenuMouseup(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    this.setState((prevState: IState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  }

  @bind
  private handleTabsClickAway() {
    this.setState({ isMenuOpen: false });
  }
}

export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(withRouter(Layout));
