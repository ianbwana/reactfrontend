
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './NavBar.css'
const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const Logout = () =>{
      window.location.reload()
      localStorage.clear();
      sessionStorage.clear();
  }

  return (
    <div>
      <Navbar color="dark" light onClick={toggleNavbar}>
        <NavbarBrand onClick={toggleNavbar} className="navbrand-custom">Survey Dashboard</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar className="navbrand-custom">
          <Nav navbar>
            <NavItem>
              <NavLink href="/dashboard" className="navbrand-custom">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/survey" className="navbrand-custom">Survey</NavLink>
            </NavItem>
            <NavItem>
              <strong><p className="logout-text" onClick={Logout}>Logout</p></strong> 
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;