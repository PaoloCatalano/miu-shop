import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="container">
      <NavBar />
      <Notify />
      <Modal />
      <div style={{ marginBottom: "9rem" }}>
        {children}

        <Footer />
      </div>
    </div>
  );
}

export default Layout;
