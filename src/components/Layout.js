import React from "react";
import { NavLink } from "react-router-dom";

const Layout = (props) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="activeLink" exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/fixtures">
                Fixtures/Results
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/news">
                News
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/resources">
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
