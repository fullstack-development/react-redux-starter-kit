import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';
import { Link } from 'react-router-dom';

import { MenuIcon } from 'shared/view/elements';
import { ClickAwayListener } from 'shared/view/components';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import './LayoutHeaderMenu.scss';

interface IMenuItem {
  path: string;
  title: string;
}

interface IOwnProps {
  menuItems: IMenuItem[];
}

interface IState {
  isMenuOpen: boolean;
}

type IProps = ITranslationProps & IOwnProps;
const b = block('layout-header-menu');
const { header } = tKeys.shared;

class LayoutHeaderMenu extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isMenuOpen: false,
  };

  public render() {
    const { menuItems, t } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <div className={b()}>
        <div
          className={b('menu-icon', { open: isMenuOpen })}
          onClick={this.handleMenuClick}
          onTouchEnd={this.handleMenuTouchEnd}
        >
          <MenuIcon />
        </div>
        <span className={b('title')}>{t(header.searchFor)}</span>
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

  @autobind
  private handleMenuClick(e: React.MouseEvent<HTMLDivElement>) {
    this.toggleMenu(e);
  }

  @autobind
  private handleMenuTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    this.toggleMenu(e);
  }

  @autobind
  private handleMenuItemsClickAway() {
    this.setState({ isMenuOpen: false });
  }
}

export { LayoutHeaderMenu, IMenuItem as IHeaderMenuItem, IProps as IHeaderMenuProps, IState as IHeaderMenuState };
export default withTranslation()(LayoutHeaderMenu);
