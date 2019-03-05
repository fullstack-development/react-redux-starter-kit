import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Link } from 'react-router-dom';

import { MenuIcon } from 'shared/view/elements';
import { ClickAwayListener } from 'shared/view/components';

import './LayoutHeaderMenu.scss';

interface IMenuItem {
  path: string;
  title: string;
}

interface IState {
  isMenuOpen: boolean;
}

interface IProps {
  menuItems: IMenuItem[];
}

const b = block('layout-header-menu');

class LayoutHeaderMenu extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isMenuOpen: false,
  };

  public render() {
    const { isMenuOpen } = this.state;
    const { menuItems } = this.props;
    return (
      <div className={b()}>
        <div
          className={b('menu-icon', { open: isMenuOpen })}
          onClick={this.handleMenuClick}
          onTouchEnd={this.handleMenuTouchEnd}
        >
          <MenuIcon />
        </div>
        <span className={b('title')}>Search for:</span>
        <ClickAwayListener
          onClickAway={this.handleMenuItemsClickAway}
          mouseEvent="onClick"
          touchEvent="onTouchEnd"
        >
          <div className={b('menu-items')}>
            {menuItems.map(this.renderMenuItem)}
          </div>
        </ClickAwayListener>
      </div>
    );
  }

  private renderMenuItem({ path, title }: IMenuItem, i: number) {
    return (
      <Link to={path} className={b('menu-item', { active: path === location.pathname })} key={i}>
        {title}
      </Link>
    );
  }

  private toggleMenu(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    e.preventDefault();
    this.setState((prevState: IState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  }

  @bind
  private handleMenuClick(e: React.MouseEvent<HTMLDivElement>) {
    this.toggleMenu(e);
  }

  @bind
  private handleMenuTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    this.toggleMenu(e);
  }

  @bind
  private handleMenuItemsClickAway() {
    this.setState({ isMenuOpen: false });
  }
}

export { IMenuItem as IHeaderMenuItem, IProps as IHeaderMenuProps };
export default LayoutHeaderMenu;
