import React from 'react';
import {Link} from 'react-router-dom'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';


export default class AppNavi extends React.Component {

    constructor(props) {
        super(props);

        this.toggle=this.toggle.bind(this);
        this.state=  {
            isOpen:false
        } ;
    }

    toggle(){
        this.setState(  {
            isOpen: !this.state.isOpen
        } );
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">SelectEve</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/user">Events</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText><Link to="admin">Admin Login</Link></NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

}