import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../imge/logo.png";
import firebase from "firebase";
import styled from "styled-components";

const Header = styled.nav`
  background: #222222;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  max-width: 1500px;
`;

const HeaderLogo = styled.img`
  width: 80px;
  padding-top: 25px;
`;

const MenuIcon = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 60%);
  font-size: 1.8rem;
  cursor: pointer;
`;

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = React.useState(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <Header>
        <HeaderContainer>
          <Link to="/" onClick={closeMobileMenu}>
            <HeaderLogo src={logo} alt="logo" />
          </Link>
          {user ? (
            <>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link
                    to="/products"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Campground
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/wishlists"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Wishlists
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/trips"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Trips
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-links"
                    onClick={() => firebase.auth().signOut()}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link
                    to="/products"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Campground
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/log-in"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Log in / Sign up
                  </Link>
                </li>
              </ul>
            </>
          )}
        </HeaderContainer>
      </Header>
    </>
  );
}

export default Navbar;
