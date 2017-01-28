import * as React from 'react';
import { Navbar, Nav, NavItem, SelectCallback } from 'react-bootstrap';
import { RouterOnContext } from 'react-router';
import { bind } from 'decko';
import * as block from 'bem-cn';
import './styles.styl';
import SyntheticEvent = React.SyntheticEvent;

interface IProps {
  children?: React.ReactNode;
}

interface IContext {
  router: RouterOnContext;
}

class Header extends React.PureComponent<IProps, {}> {
  public static contextTypes = {
    router: React.PropTypes.object,
  };
  public context: IContext;
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
  private onNavItemClick(eventKey: string, e: SyntheticEvent<{}>) {
    // TODO: use dynamic url makers
    switch (eventKey) {
    case 'order':
      this.context.router.push('/order');
      break;
    default: return;
    }
  }

  @bind
  private onBrandClick() {
    this.context.router.push('/home');
  }

}

export { IProps };
export default Header;
