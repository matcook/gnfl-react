import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const logoQuery = gql`
  {
    homePage {
      GNFLLogo {
        name
        url
      }
      GNWFLLogo {
        name
        url
      }
    }
  }
`;

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideNav = () => {
    setSidebarOpen(!sidebarOpen);
    document.querySelector("body").classList.toggle("hidden");
  };

  const { loading, error, data } = useQuery(logoQuery);

  if (loading) {
    return <nav className={styles.navbar} style={{ height: "60px" }}></nav>;
  }
  if (error) {
    console.error(error);
  }
  if (data) {
    return (
      <div className={styles.navbar}>
        <nav className="container">
          <div className={styles.logo}>
            <Link to="/">
              <img
                src={`${process.env.REACT_APP_GNFL_API_URL}${data.homePage.GNFLLogo.url}`}
                alt=""
              />
            </Link>
          </div>
          <ul className={styles.desktopNav} data-nav="main-nav">
            <li>
              <NavLink exact to="/" activeClassName="activeLink">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/fixtures" activeClassName="activeLink">
                Fixtures/Results
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" activeClassName="activeLink">
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" activeClassName="activeLink">
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources" activeClassName="activeLink">
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="activeLink">
                Contact
              </NavLink>
            </li>
          </ul>
          <ul
            className={`${styles.mobileNav} ${
              sidebarOpen ? styles.open : styles.closed
            }`}
            data-nav="side-nav"
          >
            <li>
              <NavLink
                exact
                to="/"
                onClick={toggleSideNav}
                activeClassName="activeLink"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fixtures"
                onClick={toggleSideNav}
                activeClassName="activeLink"
              >
                Fixtures/Results
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                onClick={toggleSideNav}
                activeClassName="activeLink"
              >
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                onClick={toggleSideNav}
                activeClassName="activeLink"
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                onClick={toggleSideNav}
                activeClassName="activeLink"
              >
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={toggleSideNav}
                activeClassName="activeLink"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div
            className={`${styles.backdrop} ${
              !sidebarOpen ? styles.hide : null
            }`}
            role="button"
            tabIndex={0}
            onClick={toggleSideNav}
            onKeyDown={toggleSideNav}
          ></div>
          <div
            role="button"
            tabIndex={0}
            className={styles.mobileNavButton}
            onClick={toggleSideNav}
            onKeyDown={toggleSideNav}
          >
            Menu
          </div>
          <div className={styles.logo}>
            <Link to="/">
              <img
                src={`${process.env.REACT_APP_GNFL_API_URL}${data.homePage.GNWFLLogo.url}`}
                alt=""
              />
            </Link>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
