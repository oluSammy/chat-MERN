import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="green">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Chat
          </a>
          <a href="#1" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="#2">Login</a>
            </li>
            <li>
              <a href="#2">Signup</a>
            </li>
            <li>
              <a href="#2">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Login</a>
        </li>
        <li>
          <a href="badges.html">Signup</a>
        </li>
        <li>
          <a href="collapsible.html">Logout</a>
        </li>
        <li>
          <a href="mobile.html">Mobile</a>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
