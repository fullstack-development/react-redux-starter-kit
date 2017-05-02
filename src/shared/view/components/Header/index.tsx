import * as React from 'react';
import { Navbar, Nav, NavItem, SelectCallback } from 'react-bootstrap';
import { bind } from 'decko';
import * as block from 'bem-cn';
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
        this.props.onLinkClick('/order');
        break;
      default: return;
      }
    }
  }

  @bind
  private onBrandClick() {
    if (this.props.onLinkClick) {
      this.props.onLinkClick('/home');
    }
  }

}

export { IProps };
export default Header;
