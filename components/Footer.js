import React from "react";
import Socials from "./Socials";

const Footer = () => {
  return (
    <footer>
      <div className="_lg">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <span className="_info-bold">{process.env.WEBSITE_NAME} </span>
        All Rights Reserved. Powered by{" "}
        <a href="http://vercel.com" target="_blank" rel="noopener noreferrer">
          ▲
        </a>
      </div>
      <div className="_sm">
        <span className="_info-bold">{process.env.WEBSITE_NAME} </span>
        &copy; {new Date().getFullYear()}{" "}
        <a href="http://vercel.com" target="_blank" rel="noopener noreferrer">
          ▲
        </a>
      </div>
      <Socials />
    </footer>
  );
};

export default Footer;
