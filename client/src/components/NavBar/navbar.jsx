import React from "react";

import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
} from "reactstrap";

function DemoNavbar(props) {
  return (
    <>
      <Navbar className="navbar-light bg-gradient-warning mt-0" expand="lg" id="navbar-main">
        <Container>
          <NavbarBrand className="display-2 text-capitalize text-white">
            &#60;CodeDuel&#8725;&#62;
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-primary">
            <span className="navbar-toggler-icon"/>
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-primary">
            <Nav className="ml-lg-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="text-white text-bold"
                                nav>&#60;Single-Player&#8725;&#62;</DropdownToggle>
                <DropdownMenu
                  aria-labelledby="navbar-primary_dropdown_1"
                  right
                  className="bg-gradient-gray"
                >
                  <DropdownItem
                    href="/singleplayer"
                    className="text-dark text-bold"
                  >
                    Back to singleplayer
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="text-white text-bold"
                                nav>&#60;Multi-Player&#8725;&#62;</DropdownToggle>
                <DropdownMenu
                  aria-labelledby="navbar-primary_dropdown_1"
                  right
                  className="bg-gradient-gray text-black-50 font-weight-bold"
                >
                  <DropdownItem
                    href="/multiplayer"
                    className="text-dark text-bold"
                  >
                    Invite a friend
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="text-white text-bold"
                                nav>&#60;Logout&#8725;&#62;</DropdownToggle>
                <DropdownMenu
                  aria-labelledby="navbar-primary_dropdown_1"
                  right
                  className="bg-gradient-gray"
                >
                  <DropdownItem
                    onClick={props.handleLogout}
                    className="text-dark text-bold"
                  >
                    Do you really want to leave this cool game?
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default DemoNavbar;
