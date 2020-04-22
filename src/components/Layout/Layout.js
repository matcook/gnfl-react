import React from "react";
import Navbar from "../Navbar/Navbar";
import Sponsors from "../Sponsors/Sponsors";
import styles from "./Layout.module.scss";
// import "../../App.scss";

const Layout = ({ children }) => {
  return (
    <div className="site">
      <Navbar />
      <main className="site-content">
        <div>{children}</div>
      </main>
      <div className={styles.footer}>
        <footer>
          <Sponsors />
          <div className="container">
            <p>© Great Northern Football League 2020</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
