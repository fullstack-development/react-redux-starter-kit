import * as React from 'react';
import { bind } from 'decko';
import block from 'bem-cn';
import { ROUTES_PREFIX } from 'core/constants';

import { Navbar, Nav, NavItem, SelectCallback } from 'react-bootstrap';
import './styles.scss';

interface IProps {
  children?: React.ReactNode;
  onLinkClick?(path: string): void;
}

class Header extends React.PureComponent<IProps, {}> {
  private b = block('header');

  public render() {
    const b = this.b;
    const { children } = this.props;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand onClick={this.onBrandClick} className={b('brand')()}>
            FSD Starter kit
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey="order" onSelect={this.onNavItemClick as SelectCallback}>
            Travel order form
          </NavItem>
        </Nav>
        {children}
      </Navbar>
    );
  }

  @bind
  private onNavItemClick(eventKey: string) {
    if (this.props.onLinkClick) {
      switch (eventKey) {
        case 'order':
          this.props.onLinkClick(`${ROUTES_PREFIX}/order`);
          break;
        default: return;
      }
    }
  }

  @bind
  private onBrandClick() {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(`${ROUTES_PREFIX}/home`);
    }
  }

}

export { IProps };
export default Header;
