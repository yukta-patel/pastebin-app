import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Button,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import logo from "../images/pastebin-logo.jpg";

const Header = () => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const username = localStorage.getItem("user_name");

  const logout = () => {
    if (localStorage.removeItem("token")) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  return (
    <Navbar light expand="md" className="headerDiv">
      <NavbarBrand>
        <img className="pastebin-logo" src={logo} alt="pastebin-logo" />
        <NavbarText className="logo-text">PASTEBIN</NavbarText>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <Col className="float-right">
            <NavbarText className="username">{username}</NavbarText>
          </Col>
          <NavbarText>
            <Button className="button" color="primary" onClick={logout}>
              Log Out
            </Button>
          </NavbarText>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
