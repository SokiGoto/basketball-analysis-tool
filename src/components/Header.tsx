import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { LoginInfo } from "../interfaces";

interface Props {
  loginInfo: LoginInfo;
}

const Header: React.VFC<Props> = ({ loginInfo }) => {
  const userMenu =
    loginInfo.state === "signin" ? (
      <Link to="/mypage" className="text-dark">
        マイページ
      </Link>
    ) : loginInfo.state === "signout" ? (
      <Link to="/login" className="text-dark">
        ログイン
      </Link>
    ) : (
      <></>
    );

  return (
    <div className="border-bottom border-dark">
      <Container>
        <Navbar>
          <Navbar.Brand>
		    <Link to="/">
		      <img
		        alt=""
		        src={logo}
		        width="384"
		        height="73.5"
		        className="d-inline-block align-top"
		      />
		    </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">{userMenu}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;

