import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router';

interface Props {
  children?: React.ReactNode;
}

function Header({ children }: Props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/home">FSD Starter kit</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
      </Nav>
      {children}
    </Navbar>
  );
}

export { Props };
export default Header;