import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

interface Props {
    children? : React.ReactElement<Object>
}

function Header({ children } : Props) {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">FSD Starter kit</a>
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