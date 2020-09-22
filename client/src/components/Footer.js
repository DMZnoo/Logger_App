import React from "react";
const Footer = () => {
  return (
    <footer
      className="page-footer font-small blue navbar-fixed-bottom"
      style={{ borderRadius: "0.5vw" }}
    >
      <div className="footer-copyright text-center py-3">
        &copy; {new Date().getFullYear()} Copyright:
        <a
          href="https://danieljnwlee.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          Daniel Lee
        </a>
      </div>
    </footer>
  );
};
export default Footer;
