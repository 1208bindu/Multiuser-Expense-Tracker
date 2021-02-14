import React, { useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

import { GlobalContext } from "../../context/GlobalState";

function SignedInLinks() {
  const { currentUser, logout, isTokenValid } = useContext(GlobalContext);

  let token = localStorage.getItem("auth-token");
  useEffect(() => {
    isTokenValid(token);
  }, []);
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
        <div className="nav-wrapper navColor">
          <Link to="/" className="left brand-logo">
            {" "}
            Welcome{" "}
            {currentUser ? currentUser.firstname + currentUser.lastname : ""}
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
              <NavLink to="/login" onClick={logout}>
                LogOut{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidenav" id="mobile-demo">
        <ul>
          <li className="card">
            <NavLink to="/login" onClick={logout} className="sidenav-close ">
              LogOut
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
export default SignedInLinks;
