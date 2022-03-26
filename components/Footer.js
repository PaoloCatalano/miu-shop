import React from "react";
import Socials from "./Socials";

const Footer = () => {
  return (
    <footer>
      <div className="_lg">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <span className="_info-bold">{process.env.WEBSITE_NAME} </span>
        All Rights Reserved.
      </div>
      <div className="_sm">
        <span className="_info-bold">{process.env.WEBSITE_NAME} </span>
        &copy; {new Date().getFullYear()}
      </div>
      <Socials contactLink />
    </footer>
  );
};

export default Footer;
