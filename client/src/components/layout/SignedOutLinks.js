/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

function SignedOutLinks() {
  useEffect(() => {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "right",
      inDuration: 250,
      outDuration: 300,
    });
  }, []);

  return (
    <>
      <nav>
        <div className="nav-wrapper grey darken-1">
          <Link to="/" className="left brand-logo">
            Hello
          </Link>

          <a
            href="#"
            data-target="mobile-demo"
            className="right sidenav-trigger"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              {" "}
              <NavLink to="/register">SignUp</NavLink>
            </li>
            <li>
              <NavLink to="/login">LogIn</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidenav" id="mobile-demo">
        <ul>
          <li className="card">
            {" "}
            <NavLink to="/register" className="sidenav-close">
              SignUp
            </NavLink>
          </li>
          <li className="card">
            <NavLink to="/login" className="sidenav-close ">
              LogIn
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
export default SignedOutLinks;
