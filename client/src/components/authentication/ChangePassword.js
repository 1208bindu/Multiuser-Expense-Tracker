/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

import "./style.css";

const ChangePassword = (props) => {
  const { changePwd, error, changeSuccess } = useContext(GlobalContext);

  let [password, setPwd] = useState("");
  let [password2, setPwd2] = useState("");
  const [err, setErr] = useState(error);
  const [id, setId] = useState(props.match.params.id);

  useEffect(() => {
    if (changeSuccess && !err) {
      document.getElementById("form1").style.display = "none";
      document.getElementById("confirm").style.display = "block";
    }
    if (error) {
      setErr(error);
    }

    // eslint-disable-next-line
  }, [error, changeSuccess]);

  function getPwd(e) {
    document.getElementById("demo1").innerHTML = "";
    setPwd(e.target.value);
  }

  function clearError(e) {
    document.getElementById("error").style.display = "none";
    setPwd2("");
    setPwd("");
    setErr("");
  }

  function onsub(e) {
    e.preventDefault();
    if (password.length < 6) {
      setPwd("");
      setPwd2("");
      document.getElementById("demo1").innerHTML =
        "Password Must be atleast 6 characters ";
    } else if (password !== password2) {
      setPwd("");
      setPwd2("");
      document.getElementById("demo1").innerHTML = "Password Must Match ";
    } else {
      const pwdDetails = {
        id: id,
        password: password,
      };
      changePwd(pwdDetails);
    }
  }

  return (
    <div className="container loginPage">
      <div
        id="confirm"
        className="col l8 offset-l2 center "
        style={{ display: "none" }}
      >
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h5>
              <i>
                Password changed Successfully
                <br /> <br />
              </i>
            </h5>
            <div className="center">
              <button className="btn white">
                <Link to="/login" className="textColor">
                  <b>Login to Continue</b>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="form1" className="col l6 offset-l3">
        <div className="card margins">
          <form id="form" onSubmit={onsub} className="white">
            <h4 className="grey-text text-darken-3">Change Password</h4>
            <div>
              {err ? (
                <div id="error" className="alert-p">
                  <span>{err}</span>
                  <button onClick={clearError}>X</button>
                </div>
              ) : null}
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={getPwd}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPwd2(e.target.value)}
                required
              />
              <p id="demo1" className="alert-p"></p>
            </div>
            <div className="input-field">
              <button className="btn blue darken-2 z-depth-0">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
